import { artistCreateSchema } from "../schemas/artist.js";
import type { Request, Response } from "express";
import { Prisma, ArtistType } from "@prisma/client";
import prisma from "../prisma.js";

type ArtistWithUser = Prisma.ArtistProfileGetPayload<{
    include: { user: { select: { id: true; name: true; email: true } } };
}>;

const isPrismaJsonNull = (value: unknown): value is typeof Prisma.JsonNull => value === Prisma.JsonNull;

const formatArtist = (artist: ArtistWithUser) => ({
    ...artist,
    pricePerGig: artist.pricePerGig ? Number(artist.pricePerGig) : null,
    availability: isPrismaJsonNull(artist.availability) || artist.availability === null
        ? null
        : artist.availability
});

export const createArtist = async (req: Request, res: Response) => {
    try {
        const parsed = artistCreateSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ message: "Invalid data", errors: parsed.error.format() });
        }
        const data = parsed.data;
        if(!req.user){
            return res.status(401).json({message:"Unauthorized"});
        }
        //verify user role from middleware and check user has no artist profile yet
        if(req.user.role !== "ARTIST"){
            return res.status(403).json({message:"Forbidden"});
        }
        const existingArtist = await prisma.artistProfile.findUnique({where:{userId:req.user.id}});
        if(existingArtist){
            return res.status(400).json({message:"Artist profile already exists"});
        }
        const { pricePerGig, availability, mediaUrls, ...rest } = data;

        const createData: Prisma.ArtistProfileCreateInput = {
            ...rest,
            user: { connect: { id: req.user.id } }
        };

        if (pricePerGig !== undefined) {
            createData.pricePerGig = new Prisma.Decimal(pricePerGig);
        }

        if (mediaUrls !== undefined) {
            createData.mediaUrls = mediaUrls;
        }

        if (availability !== undefined) {
            createData.availability = availability === null ? Prisma.JsonNull : availability;
        }

        const artist = await prisma.artistProfile.create({
            data: createData,
            include: { user: { select: { id: true, name: true, email: true } } }
        });
        res.status(201).json(formatArtist(artist));
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
        return;
    }
}
//api end point to get /artitst (list + filter + pagination) and /artist/:id (get by id)
export const getArtists = async (req: Request, res: Response) => {
    try {
        const { page = "1", limit = "10", location, artistType, minPrice, maxPrice } = req.query;

        const parsedPage = Number.parseInt(page as string, 10);
        const parsedLimit = Number.parseInt(limit as string, 10);

        const parseDecimal = (value: string) => {
            try {
                return new Prisma.Decimal(value);
            } catch {
                return null;
            }
        };

        if (Number.isNaN(parsedPage) || parsedPage < 1) {
            return res.status(400).json({ message: "Invalid page value" });
        }

        if (Number.isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
                return res.status(400).json({ message: "Invalid limit value" });
        }

        const offset = (parsedPage - 1) * parsedLimit;
        const where: Prisma.ArtistProfileWhereInput = {};

        if (location) {
            where.location = { contains: location as string, mode: "insensitive" };
        }

        if (artistType) {
            const allowedArtistTypes = Object.values(ArtistType);
            if (!allowedArtistTypes.includes(artistType as ArtistType)) {
                return res.status(400).json({ message: "Invalid artistType value" });
            }
            where.artistType = artistType as ArtistType;
        }

        const priceFilter: { gte?: Prisma.Decimal; lte?: Prisma.Decimal } = {};
        if (minPrice !== undefined) {
            const minDecimal = parseDecimal(minPrice as string);
            if (!minDecimal) {
                return res.status(400).json({ message: "Invalid minPrice value" });
            }
            priceFilter.gte = minDecimal;
        }

        if (maxPrice !== undefined) {
            const maxDecimal = parseDecimal(maxPrice as string);
            if (!maxDecimal) {
                return res.status(400).json({ message: "Invalid maxPrice value" });
            }
            priceFilter.lte = maxDecimal;
        }

        if (priceFilter.gte !== undefined && priceFilter.lte !== undefined) {
            if ((priceFilter.gte as Prisma.Decimal).greaterThan(priceFilter.lte as Prisma.Decimal)) {
                return res.status(400).json({ message: "minPrice cannot be greater than maxPrice" });
            }
        }

        if (Object.keys(priceFilter).length > 0) {
            where.pricePerGig = priceFilter;
        }

        const [total, artists] = await Promise.all([
            prisma.artistProfile.count({ where }),
            prisma.artistProfile.findMany({
                where,
                skip: offset,
                take: parsedLimit,
                include: { user: { select: { id: true, name: true, email: true } } }
            })
        ]);

        res.status(200).json({
            total,
            page: parsedPage,
            limit: parsedLimit,
            artists: artists.map(formatArtist)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getArtistById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Artist ID is required" });
        }
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
        if (!isUuid) {
            return res.status(400).json({ message: "Invalid artist ID" });
        }
        const artist = await prisma.artistProfile.findUnique({
            where: { id },
            include: { user: { select: { id: true, name: true, email: true } } }
        });
        if (!artist) {
            return res.status(404).json({ message: "Artist not found" });
        }
        res.status(200).json(formatArtist(artist));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//api function for PUT /api/artists/:id to update profile (only by the owner)
export const updateArtist = async (req:Request , res:Response) => {
    try{
        const {id}= req.params;
        if(!id){
            res.status(400).json({message:"Artist ID is required"});
            return;
        }
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
        if(!isUuid){
            return res.status(400).json({message:"Invalid artist ID"});
        }
        if(!req.user){
            return res.status(401).json({message:"Unauthorized"});
        }
        //verify user role from middleware and check user is the owner of the profile
        if(req.user.role !== "ARTIST"){
            return res.status(403).json({message:"Forbidden"});
        }
        const existingArtist = await prisma.artistProfile.findUnique({where:{id}});
        if(!existingArtist){
            return res.status(404).json({message:"Artist profile not found"});
        }
        if(existingArtist.userId !== req.user.id){
            return res.status(403).json({message:"You can only update your own profile"});
        }
        const parsed = artistCreateSchema.partial().safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({message:"Invalid data", errors: parsed.error.format()});
        }
        const data = parsed.data;
        const { artistType, location, bio, pricePerGig, availability, mediaUrls } = data;
        const updateData: Prisma.ArtistProfileUpdateInput = {};

        if(artistType !== undefined){
            updateData.artistType = artistType;
        }
        if(location !== undefined){
            updateData.location = location;
        }
        if(bio !== undefined){
            updateData.bio = bio;
        }
        if(pricePerGig !== undefined){
            updateData.pricePerGig = new Prisma.Decimal(pricePerGig);
        }
        if(mediaUrls !== undefined){
            updateData.mediaUrls = mediaUrls;

        }
        if(availability !== undefined){
            updateData.availability = availability === null ? Prisma.JsonNull : availability;
        }
        const artist = await prisma.artistProfile.update({
            where:{id},
            data: updateData,
            include:{user:{select:{id:true,name:true,email:true}}}
        });
        res.json(formatArtist(artist));
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//api function for DELETE /api/artists/:id to delete profile (only by the owner)
export const deleteArtist = async (req:Request , res:Response) => {
    try{
        const {id}= req.params;
        if(!id){
            return res.status(400).json({message:"Artist ID is required"});
        }
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
        if(!isUuid){
            return res.status(400).json({message:"Invalid artist ID"});
        }
        if(!req.user){
            return res.status(401).json({message:"Unauthorized"});
        }
        //verify user role from middleware and check user is the owner of the profile
        if(req.user.role !== "ARTIST"){
            return res.status(403).json({message:"Forbidden"});
        }
        const existingArtist = await prisma.artistProfile.findUnique({where:{id}});
        if(!existingArtist){
            return res.status(404).json({message:"Artist profile not found"});
        }
        if(existingArtist.userId !== req.user.id){
            return res.status(403).json({message:"You can only delete your own profile"});
        }
        const deletedArtist = await prisma.artistProfile.delete({
            where:{id},
            include:{user:{select:{id:true,name:true,email:true}}}
        });

        return res.status(200).json(formatArtist(deletedArtist));
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// deleted getMyArtist function since we have /artist/:id endpoint


export const artistController = {
    createArtist,
    getArtists,
    getArtistById,
    updateArtist,
    deleteArtist,
};


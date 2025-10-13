// POST /api/bookings → Venue creates a booking request

// GET /api/bookings → List bookings relevant to user (artist gets bookings for their artistProfile; venue gets bookings they requested)

// PUT /api/bookings/:id/status → Artist accepts/rejects (only artist role)

// GET /api/bookings/:id → fetch single booking

// Create booking controller (important validations):

// Validate body (artistId, date, message)

// Ensure req.user.role === 'VENUE'

// Ensure artistId exists

// Ensure date is in the future
// Ensure venue (req.user.id) has a venueProfile
// Create booking with status 'PENDING', link to artistProfileId and venueProfileId
import type { Request, Response } from "express"
import { Prisma } from "@prisma/client"
import prisma from "../prisma.js"
import { bookingBaseSchema, bookingCreateSchema, bookingIdParamSchema ,bookingStatusUpdateSchema } from "../schemas/booking.js"

export const createBooking = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" })
        }

        if (req.user.role !== "VENUE") {
            return res.status(403).json({ error: "Only venues can create bookings" })
        }

        const parsed = bookingCreateSchema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid request body", details: parsed.error.format() })
        }

        const { artistId, date, message } = parsed.data
        if (date <= new Date()) {
            return res.status(400).json({ error: "Date must be in the future" })
        }

        const artistProfile = await prisma.artistProfile.findUnique({ where: { id: artistId } })
        if (!artistProfile) {
            return res.status(404).json({ error: "Artist profile not found" })
        }

        const venueProfile = await prisma.venueProfile.findUnique({ where: { userId: req.user.id } })
        if (!venueProfile) {
            return res.status(400).json({ error: "Venue profile not found for the user" })
        }

        const bookingData: Prisma.BookingCreateInput = {
            artist: { connect: { id: artistProfile.id } },
            venue: { connect: { id: venueProfile.id } },
            date,
            status: "PENDING",
            message: message ?? null,
        }

        const booking = await prisma.booking.create({ data: bookingData })

        return res.status(201).json(bookingBaseSchema.parse(booking))
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return res.status(409).json({ error: "A booking already exists for this artist, venue, and date" })
        }

        console.error("Error creating booking:", error)
        return res.status(500).json({ error: "Internal server error" })
    }
}
export const listBookings = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        if (req.user.role === "ARTIST") {
            const artistProfile = await prisma.artistProfile.findUnique({ where: { userId: req.user.id } })
            if (!artistProfile) {
                return res.status(400).json({ error: "Artist profile not found for the user" })
            }

            const bookings = await prisma.booking.findMany({
                where: { artistId: artistProfile.id },
                include: { venue: true },
            })

            return res.status(200).json(bookings)
        }

        if (req.user.role === "VENUE") {
            const venueProfile = await prisma.venueProfile.findUnique({ where: { userId: req.user.id } })
            if (!venueProfile) {
                return res.status(400).json({ error: "Venue profile not found for the user" })
            }

            const bookings = await prisma.booking.findMany({
                where: { venueId: venueProfile.id },
                include: { artist: true },
            })

            return res.status(200).json(bookings)
        }

        return res.status(403).json({ error: "Forbidden" })
    } catch (error) {
        console.error("Error listing bookings:", error)
        return res.status(500).json({ error: "Internal server error" })
    }
}
export const getBookingById = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        const parsedParams = bookingIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ error: "Invalid booking id", details: parsedParams.error.format() })
        }

        const { id } = parsedParams.data

        const booking = await prisma.booking.findUnique({
            where: { id },
        })
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" })
        }

        if (req.user.role === "ARTIST") {
            const artistProfile = await prisma.artistProfile.findUnique({ where: { userId: req.user.id } })
            if (!artistProfile) {
                return res.status(403).json({ error: "Artist profile not found for the user" })
            }

            if (booking.artistId !== artistProfile.id) {
                return res.status(403).json({ error: "Forbidden" })
            }
        } else if (req.user.role === "VENUE") {
            const venueProfile = await prisma.venueProfile.findUnique({ where: { userId: req.user.id } })
            if (!venueProfile) {
                return res.status(403).json({ error: "Venue profile not found for the user" })
            }

            if (booking.venueId !== venueProfile.id) {
                return res.status(403).json({ error: "Forbidden" })
            }
        } else {
            return res.status(403).json({ error: "Forbidden" })
        }

        const sanitizedBooking = bookingBaseSchema.parse({
            id: booking.id,
            artistId: booking.artistId,
            venueId: booking.venueId,
            date: booking.date,
            status: booking.status,
            message: booking.message ?? null,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt,
        })

        return res.status(200).json(sanitizedBooking)
    } catch (error) {
        console.error("Error fetching booking:", error)
        return res.status(500).json({ error: "Internal server error" })
    }
}
export const updateBookingStatus = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        const parsedParams = bookingIdParamSchema.safeParse(req.params)
        if(!parsedParams.success){
            return res.status(400).json({error: "Invalid booking id", details: parsedParams.error.format()})
        }

        //first we take the id from params (for particular booking) and check if the user is an artist
        const { id } = parsedParams.data
        if (req.user.role !== "ARTIST") {
            return res.status(403).json({ error: "Only artists can update booking status" })
        }
        const parsedBody = bookingStatusUpdateSchema.safeParse(req.body)
        if(!parsedBody.success){
            return res.status(400).json({error: "Invalid request body", details: parsedBody.error.format()})
        }


        //in this part we take the status from body and check if the booking exists, if the artist profile exists for the user, if the booking belongs to the artist, and if the booking is still pending
        const { status } = parsedBody.data
        const booking = await prisma.booking.findUnique({ where: { id } })
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" })
        }
        const artistProfile = await prisma.artistProfile.findUnique({ where: { userId: req.user.id } })
        if (!artistProfile) {
            return res.status(400).json({ error: "Artist profile not found for the user" })
        }
        if (booking.artistId !== artistProfile.id) {
            return res.status(403).json({ error: "Forbidden" })
        }
        if (booking.status !== "PENDING") {
            return res.status(400).json({ error: "Only pending bookings can be updated" })
        }
        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: { status },
        })
        return res.status(200).json(bookingBaseSchema.parse(updatedBooking))

    }catch (error) {
        console.error("Error updating booking status:", error)
        return res.status(500).json({ error: "Internal server error" })
    }
}
export const deleteBooking = async (req: Request, res: Response) => {   
    try{
        if(!req.user){
            return res.status(401).json({ error: "Unauthorized" })
        }
        const parsedParams = bookingIdParamSchema.safeParse(req.params)
        if(!parsedParams.success){
            return res.status(400).json({error: "Invalid booking id", details: parsedParams.error.format()})
        }
        const { id } = parsedParams.data;

        const booking = await prisma.booking.findUnique({where:{id}})
        if(!booking){
            return res.status(404).json({error: "Booking not found"})
        }
        if (booking.status !== "PENDING") {
            return res.status(400).json({ error: "Only pending bookings can be deleted" })
        }
        if(req.user.role === "ARTIST"){
            const artistProfile = await prisma.artistProfile.findUnique({where:{userId: req.user.id}})
            if(!artistProfile){
                return res.status(403).json({error: "Artist profile not found for the user"})
            }
            if(booking.artistId !== artistProfile.id){
                return res.status(403).json({error: "Forbidden"})
            }
        }else if(req.user.role === "VENUE"){
            const venueProfile = await prisma.venueProfile.findUnique({where:{userId: req.user.id}})
            if(!venueProfile){
                return res.status(403).json({error: "Venue profile not found for the user"})
            }
            if(booking.venueId !== venueProfile.id){
                return res.status(403).json({error: "Forbidden"})
            }
        }
        else{
            return res.status(403).json({error: "Forbidden"})
        }   
        await prisma.booking.delete({where:{id}})
        return res.status(204).send()
    }catch(error){
        console.error("Error deleting booking:", error)
        return res.status(500).json({ error: "Internal server error" })
    }
}


export const bookingController = { 
    createBooking,
    listBookings,
    getBookingById,
    updateBookingStatus,
    deleteBooking
}

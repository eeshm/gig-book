import type { Request, Response } from "express";
import venueCreateSchema from "../schemas/venue.js";
import { Prisma } from "@prisma/client";
import prisma from "../prisma.js";

export const createVenue = async (req: Request, res: Response) => {
  try {
    const parsed = venueCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      console.error("Validation failed:", JSON.stringify(parsed.error.format(), null, 2));
      return res.status(400).json({ message: "Invalid data", errors: parsed.error.format() });
    }
    const data = parsed.data;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "VENUE") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const existingVenue = await prisma.venueProfile.findUnique({
      where: { userId: req.user.id },
    });
    if (existingVenue) {
      return res.status(400).json({ message: "Venue profile already exists for this user" });
    }
    const { mediaUrls, capacity, venueType, ...rest } = data;

    const createdData: Prisma.VenueProfileCreateInput = {
      ...rest,
      user: { connect: { id: req.user.id } },
    };
    if (mediaUrls !== undefined) {
      createdData.mediaUrls = mediaUrls;
    }
    if (capacity !== undefined) {
      createdData.capacity = capacity;
    }
    if (venueType !== undefined) {
      createdData.venueType = venueType;
    }

    const venue = await prisma.venueProfile.create({
      data: createdData,
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    return res.status(201).json(venue);
  } catch (error) {
    console.error("Error creating venue:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//this function is to get the profile of the logged in venue

export const getMyVenueProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.user.role !== "VENUE") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const venue = await prisma.venueProfile.findUnique({
      where: { userId: req.user.id },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    if (!venue) {
      return res.status(404).json({ message: "Venue profile not found" });
    }
    return res.status(200).json(venue);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error !");
  }
};

export const getVenues = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10", location } = req.query;

    const parsedPage = Number.parseInt(page as string, 10);
    const parsedLimit = Number.parseInt(limit as string, 10);

    const offset = (parsedPage - 1) * parsedLimit;

    if (Number.isNaN(parsedPage) || parsedPage < 1) {
      return res.status(400).json("Invalid page number");
    }
    if (Number.isNaN(parsedLimit) || parsedLimit > 100) {
      return res.status(400).json({ message: "Invalid limit value" });
    }

    const where: Prisma.VenueProfileWhereInput = {};
    if (location) {
      where.location = { contains: location as string, mode: "insensitive" };
    }

    const [total, venues] = await Promise.all([
      prisma.venueProfile.count({ where }),
      prisma.venueProfile.findMany({
        where,
        skip: offset,
        take: parsedLimit,
        include: { user: { select: { id: true, name: true, email: true } } },
      }),
    ]);
    return res.status(200).json({ total, venues });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error !");
  }
};

export const getVenueById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Venue Id is required" });
    }
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    if (!isUuid) {
      return res.status(400).json({ message: "Invalid venue ID" });
    }

    const venue = await prisma.venueProfile.findUnique({
      where: { id },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    return res.status(200).json(venue);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error !");
  }
};

export const updateVenue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Venue Id is required" });
    }
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    if (!isUuid) {
      return res.status(400).json({ message: "Invalid venue ID" });
    }
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.user.role !== "VENUE") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const existingVenue = await prisma.venueProfile.findUnique({
      where: { id },
    });
    if (!existingVenue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    if (existingVenue.userId !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own venue profile" });
    }
    const parsed = venueCreateSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid data", errors: parsed.error.format() });
    }
    const data = parsed.data;

    const { venueName, location, description, mediaUrls, capacity, venueType } = data;
    const updatedData: Prisma.VenueProfileUpdateInput = {};
    if (venueName !== undefined) {
      updatedData.venueName = venueName;
    }
    if (location !== undefined) {
      updatedData.location = location;
    }
    if (description !== undefined) {
      updatedData.description = description;
    }
    if (mediaUrls !== undefined) {
      updatedData.mediaUrls = mediaUrls;
    }
    if (capacity !== undefined) {
      updatedData.capacity = capacity;
    }
    if (venueType !== undefined) {
      updatedData.venueType = venueType;
    }
    const venue = await prisma.venueProfile.update({
      where: { id },
      data: updatedData,
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    return res.status(200).json(venue);
  } catch (error) {
    console.error("Error updating venue:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteVenue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Venue Id is required" });
    }
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    if (!isUuid) {
      return res.status(400).json({ message: "Invalid venue ID" });
    }
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.user.role !== "VENUE") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const existingVenue = await prisma.venueProfile.findUnique({
      where: { id },
    });
    if (!existingVenue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    if (existingVenue.userId !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own venue profile" });
    }
    await prisma.venueProfile.delete({
      where: { id },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    return res.status(200).json({ message: "Venue deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error !");
  }
};

export const venueController = {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
  getMyVenueProfile,
};

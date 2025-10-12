// create routes for artists from artistController
import express from "express";
import {
    createArtist,
    getArtists,
    getArtistById,
    updateArtist,
    deleteArtist
} from "../controllers/artistController.js";
import auth from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";

const artistRoutes= express.Router();
artistRoutes.get("/", getArtists);
artistRoutes.get("/:id", getArtistById);
artistRoutes.post("/", auth, requireRole("ARTIST"), createArtist);
artistRoutes.put("/:id", auth, requireRole("ARTIST"), updateArtist);
artistRoutes.delete("/:id", auth, requireRole("ARTIST"), deleteArtist);

export default artistRoutes;
 


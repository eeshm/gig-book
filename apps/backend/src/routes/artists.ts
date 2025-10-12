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

const router = express.Router();
router.get("/", getArtists);
router.get("/:id", getArtistById);
router.post("/", auth, requireRole("ARTIST"), createArtist);
router.put("/:id", auth, requireRole("ARTIST"), updateArtist);
router.delete("/:id", auth, requireRole("ARTIST"), deleteArtist);

export default router;



import express from "express";
import {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
} from "../controllers/venueController.js";
import auth from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";


const venueRoutes = express.Router();

venueRoutes.get("/:id", getVenueById);
venueRoutes.get("/", getVenues);
venueRoutes.post("/", auth, requireRole("VENUE"), createVenue);
venueRoutes.put("/:id", auth, requireRole("VENUE"), updateVenue);
venueRoutes.delete("/:id", auth, requireRole("VENUE"), deleteVenue);

export default venueRoutes;

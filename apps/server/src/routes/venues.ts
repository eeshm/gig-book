import express from "express";
import {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
  getMyVenueProfile,
} from "../controllers/venueController.js";
import auth from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";

const venueRoutes = express.Router();

// IMPORTANT: Specific routes must come before parameterized routes
venueRoutes.get("/me", auth, requireRole("VENUE"), getMyVenueProfile);
venueRoutes.get("/", getVenues);
venueRoutes.post("/", auth, requireRole("VENUE"), createVenue);
venueRoutes.get("/:id", getVenueById);
venueRoutes.put("/:id", auth, requireRole("VENUE"), updateVenue);
venueRoutes.delete("/:id", auth, requireRole("VENUE"), deleteVenue);

export default venueRoutes;

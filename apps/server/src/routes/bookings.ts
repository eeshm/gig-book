import express from "express";
import {
  createBooking,
  deleteBooking,
  getBookingById,
  listBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import auth from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";

const bookingRoutes = express.Router();

bookingRoutes.post("/", auth, requireRole("VENUE"), createBooking);
bookingRoutes.get("/", auth, listBookings);
bookingRoutes.get("/:id", auth, getBookingById);
bookingRoutes.put("/:id/status", auth, requireRole("ARTIST"), updateBookingStatus);
bookingRoutes.delete("/:id", auth, deleteBooking);

export default bookingRoutes;

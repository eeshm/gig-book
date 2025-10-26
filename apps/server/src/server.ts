import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import artistRoutes from "./routes/artists.js";
import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/bookings.js";
import venueRoutes from "./routes/venues.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// CORS must be configured before other middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(errorHandler);

export default app;

import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import artistRoutes from "./routes/artists.js"
import authRoutes from "./routes/auth.js"
import bookingRoutes from "./routes/bookings.js"
import venueRoutes from "./routes/venues.js"
import { errorHandler } from "./middleware/errorHandler.js"



dotenv.config();

const app = express();


app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials:true,
}))


app.use('/api/auth', authRoutes)
app.use("/api/artists", artistRoutes)
app.use("/api/venues", venueRoutes)
app.use("/api/bookings", bookingRoutes)

app.use(errorHandler)

export default app;

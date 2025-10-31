import express from "express";
import { login, register, me, googleAuth } from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/me", auth, me);
authRoutes.post("/google", googleAuth);

export default authRoutes;

import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";
import { registerSchema, loginSchema } from "../schemas/auth.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.format() });

    const { name, email, password, role } = parsed.data;

    const exist = await prisma.user.findUnique({ where: { email } });

    if (exist) return res.status(409).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(
      password,
      process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10
    );
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role },
    });
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.format() });
    const { email, password } = parsed.data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) return res.status(401).json({ message: "Invalid credentials" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not configured");
      return res.status(500).json({ message: "Internal server error" });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, secret, { expiresIn: "7d" });

    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//deleted me function
export const logout = async (req: Request, res: Response) => {
  try {
    // Since JWT is stateless, we can't truly "logout" on the server side.
    // The client should simply delete the token on their side.
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const me = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("/me endpoint error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { email, name, googleId, image, role } = req.body;

    // Validate required fields
    if (!email || !googleId) {
      return res.status(400).json({ error: "Email and googleId required" });
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // New user (Signup) - Create with role from frontend
      user = await prisma.user.create({
        data: {
          email,
          name: name || email.split("@")[0],
          googleId,
          image,
          role: role || "ARTIST",
          emailVerified: new Date(),
        },
      });
    } else if (!user.googleId) {
      // Existing user linking Google - Update googleId
      user = await prisma.user.update({
        where: { email },
        data: { googleId },
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("❌ Google auth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

export const authController = {
  register,
  login,
  logout,
  me,
  googleAuth,
};

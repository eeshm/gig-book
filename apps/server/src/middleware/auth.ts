import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import prisma from "../prisma.js";
import { de } from "zod/locales";

type JwtPayload = {
    userId: string;
    iat?: number;
    exp?: number;
};

export default async function auth(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = header.slice("Bearer ".length).trim();
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        const user = await prisma.user.findUnique({ where: { id: payload.userId } });
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = { id: user.id, role: user.role, email: user.email };
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
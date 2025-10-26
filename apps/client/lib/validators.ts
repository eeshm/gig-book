// apps/frontend/lib/validators.ts
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  //@ts-ignore
  role: z.enum(["ARTIST", "VENUE"], { required_error: "You must select a role." }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export const artistProfileSchema = z.object({
  artistType: z.string().min(1, { message: "Artist type is required." }),
  location: z.string().min(1, { message: "Location is required." }),
  bio: z
    .string()
    .min(10, { message: "Bio must be at least 10 characters." })
    .max(500, { message: "Bio cannot exceed 500 characters." }),
  pricePerGig: z.number().min(0, { message: "Price must be a positive number." }),
});
// Type definitions inferred from schemas
export type ArtistProfileFormData = z.infer<typeof artistProfileSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

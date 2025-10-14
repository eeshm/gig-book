// types/index.ts

export type UserRole = "ARTIST" | "VENUE";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Artist {
  id: string;
  userId: string;
  artistType: string;
  location: string;
  bio: string;
  pricePerGig: number;
  mediaUrls: string[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Venue {
  id: string;
  userId: string;
  name: string;
  location: string;
  capacity: number;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  artistId: string;
  venueId: string;
  date: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  message: string;
  status: number;
}
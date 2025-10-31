// User & Auth Types
export type UserRole = "ARTIST" | "VENUE";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  // Optional profile image (e.g. from OAuth providers like Google)
  image?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

// Artist Types
export type ArtistType = "DJ" | "LIVE_PERFORMER" | "SINGER" | "INSTRUMENTALIST" | "BAND" | "OTHER";

export interface Artist {
  id: string;
  userId: string;
  artistType: ArtistType;
  location: string;
  bio: string;
  pricePerGig: number;
  mediaUrls: string[];
  availability?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateArtistData {
  artistType: ArtistType;
  location: string;
  bio: string;
  pricePerGig: number;
  mediaUrls?: string[];
  availability?: Record<string, any>;
}

// Venue Types
export interface Venue {
  id: string;
  userId: string;
  venueName: string;
  location: string;
  description: string;
  mediaUrls?: string[];
  capacity?: number;
  venueType?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateVenueData {
  venueName: string;
  location: string;
  description: string;
  mediaUrls?: string[];
  capacity?: number;
  venueType?: string;
}

// Booking Types
export type BookingStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface Booking {
  id: string;
  artistId: string;
  venueId: string;
  date: string;
  status: BookingStatus;
  message?: string;
  createdAt: string;
  updatedAt?: string;
  artist?: Artist;
  venue?: Venue;
}

export interface CreateBookingData {
  artistId: string;
  date: string;
  message?: string;
}

export interface UpdateBookingStatusData {
  id: string;
  status: BookingStatus;
}

// src/lib/api.ts
import api from "./axios";

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: "ARTIST" | "VENUE";
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const registerUser = (payload: RegisterPayload) =>
  api.post("/auth/register", payload).then((r) => r.data);

export const loginUser = (payload: LoginPayload) =>
  api.post("/auth/login", payload).then((r) => r.data);

// fetches relevant profile
export const getArtistProfile = () => api.get("/artists/me").then((r) => r.data);
export const getVenueProfile = () => api.get("/venues/me").then((r) => r.data);

// additional helpers you'll use later
export const fetchBookings = () => api.get("/bookings").then((r) => r.data);
export const createBooking = (payload: any) => api.post("/bookings", payload).then((r) => r.data);
export const updateBookingStatus = (id: string, status: string) =>
  api.put(`/bookings/${id}/status`, { status }).then((r) => r.data);
export const fetchArtists = () => api.get("/artists").then((r) => r.data);
export const fetchVenues = () => api.get("/venues").then((r) => r.data);
export const createArtistProfile = (payload: any) =>
  api.post("/artists", payload).then((r) => r.data);
export const createVenueProfile = (payload: any) =>
  api.post("/venues", payload).then((r) => r.data);
export const updateArtistProfile = (payload: any) =>
  api.put("/artists/me", payload).then((r) => r.data);
export const updateVenueProfile = (payload: any) =>
  api.put("/venues/me", payload).then((r) => r.data);   
export const uploadMedia = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/media/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(r => r.data);
}
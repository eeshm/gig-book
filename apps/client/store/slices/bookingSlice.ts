import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { Booking, CreateBookingData, UpdateBookingStatusData } from "@/types";

export interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}
const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

export const  fetchMyBookings = createAsyncThunk(
    "booking/fetchMyBookings",
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get<Booking[]>("/api/bookings"); 
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || "Failed to fetch bookings");
        }
    }
);

export const fetchBookingById = createAsyncThunk(
    "booking/getBookingById",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await api.get<Booking>(`/api/bookings/${id}`);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch booking");
        }
    }
);

//(venue -> artist) Create Booking
export const createBooking = createAsyncThunk(
    "booking/createBooking",
    async (data: CreateBookingData, { rejectWithValue }) => {
        try {
            const response = await api.post<Booking>("/api/bookings", data);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to create booking");
        }
    }
);

export const updateBookingStatus = createAsyncThunk(
    "booking/updateBookingStatus",
    async ({ id, status }: UpdateBookingStatusData, { rejectWithValue }) => {
        try {
            const response = await api.put<Booking>(`/api/bookings/${id}/status`, { status });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to update booking status");
        }   
    }
);

//only for PENDING bookings
export const deleteBooking = createAsyncThunk(
    "booking/deleteBooking",
    async (id: string, { rejectWithValue }) => {
        try {
            await api.delete(`/api/bookings/${id}`);
            return id;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to delete booking");
        }
    }
);
const bookingSlice = createSlice({
  name: "booking",
  initialState,
    reducers: {
        clearBookingError: (state) => {
        state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchMyBookings.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchMyBookings.fulfilled, (state, action) => {
            state.loading = false;
            state.bookings = action.payload;
        })
        .addCase(fetchMyBookings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

    builder
        .addCase(createBooking.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createBooking.fulfilled, (state, action) => {
            state.loading = false;
            state.bookings.push(action.payload);
        })
        .addCase(createBooking.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        builder
        .addCase(updateBookingStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateBookingStatus.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
            if (index !== -1) {
                state.bookings[index] = action.payload;
            }
        })
        .addCase(updateBookingStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

    builder
        .addCase(deleteBooking.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteBooking.fulfilled, (state, action) => {
            state.loading = false;
            state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
        })
        .addCase(deleteBooking.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

    builder
        .addCase(fetchBookingById.pending, (state) => {
            state.loading = true;
            state.error = null;
        }
        )
        .addCase(fetchBookingById.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
            if (index !== -1) {
                state.bookings[index] = action.payload;
            } else {
                state.bookings.push(action.payload);
            }
        })
        .addCase(fetchBookingById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    },
});
export const { clearBookingError } = bookingSlice.actions;
export default bookingSlice.reducer;


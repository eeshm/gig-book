//make veneue slice as per we made artist slice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { Venue,CreateVenueData } from "@/types";
import toast from "react-hot-toast";

export interface VenueState {
  profile: Venue | null;
  venues: Venue[];
  loading: boolean;
  error: string | null;
}
const initialState: VenueState = {
  profile: null,
  venues: [],
  loading: false,
  error: null,
};
export const fetchMyVenueProfile = createAsyncThunk(
  "venue/fetchMyProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response= await api.get<Venue>("/api/venues/me");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message ||"Failed to fetch venue profile");
    }
  }
);
export const createVenueProfile = createAsyncThunk(
  "venue/createProfile",
  async (
    data: CreateVenueData,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post<Venue>("/api/venues", data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to create venue profile");
    }
  }
);
export const updateVenueProfile = createAsyncThunk(
  "venue/updateProfile",
  async ( {id, data}: {id: string; data: Partial<CreateVenueData>}, { rejectWithValue }) => {
    try {
      const response = await api.put<Venue>(`/api/venues/${id}`, { id, ...data });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to update venue profile");
    }
  }
);

export const fetchAllVenues = createAsyncThunk(
  "venue/fetchAllVenues",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Venue[]>("/api/venues");
      return response.data;
    }
    catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch venues");
    }
  }
);

export const fetchVenueById = createAsyncThunk(
  "venue/fetchVenueById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get<Venue>(`/api/venues/${id}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch venue");
    }
  }
);

export const venueSlice = createSlice({
  name: "venue",
  initialState,
  reducers: {
    clearVenueError:(state) =>{
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyVenueProfile.pending, (state) => {
        state.loading = true;
      })
      builder.addCase(
        fetchMyVenueProfile.fulfilled,
        (state, action) => {
          state.loading = false;
          state.profile = action.payload;
        })
      .addCase(
        fetchMyVenueProfile.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );

    builder
      .addCase(createVenueProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createVenueProfile.fulfilled,
        (state, action) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
      .addCase(
        createVenueProfile.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
    builder
      .addCase(updateVenueProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateVenueProfile.fulfilled,
        (state, action) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
      .addCase(
        updateVenueProfile.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );

      builder 
      .addCase(fetchAllVenues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllVenues.fulfilled, (state, action) => {
        state.loading = false;
        state.venues = action.payload;
      })
      .addCase(fetchAllVenues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
      builder
      .addCase(fetchVenueById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVenueById.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchVenueById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearVenueError } = venueSlice.actions;
export default venueSlice.reducer;
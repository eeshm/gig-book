//make veneue slice as per we made artist slice
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { Venue } from "@/types";
import toast from "react-hot-toast";

interface VenueState {
  profile: Venue | null;
  loading: boolean;
  uploading: boolean;
  error: string | null;
}
const initialState: VenueState = {
  profile: null,
  loading: false,
  uploading: false,
  error: null,
};
export const fetchVenueProfile = createAsyncThunk(
  "venue/fetchProfile",
  async (venueId: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get<{ venue: Venue }>(`/venues/${venueId}`);
      return data.venue;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createVenueProfile = createAsyncThunk(
  "venue/createProfile",
  async (
    payload: {
      venueName: string;
      location: string;
      description: string;
      mediaUrls: string[];
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.post<{ venue: Venue }>("/venues", payload);
      return data.venue;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const updateVenueProfile = createAsyncThunk(
  "venue/updateProfile",
  async (
    payload: {
      venueName?: string;
      location?: string;
      description?: string;
      mediaUrls?: string[];
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.put<{ venue: Venue }>("/venues", payload);
      return data.venue;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const uploadMedia = createAsyncThunk(
  "artist/uploadMedia",
  async (file: File, { getState, dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );
      const clouddinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
      const response = await fetch(clouddinaryUrl, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload media");
      }
      const data = await response.json();
      const mediaUrl = data.secure_url;

      const state = getState() as { venue: VenueState };
      const currentMedia = state.venue.profile?.mediaUrls || [];
      await dispatch(
        updateVenueProfile({
          mediaUrls: [...currentMedia, mediaUrl],
        })
      );

      return mediaUrl;
    } catch (err: any) {
      toast.error(err.message || "Failed to upload media");
      return rejectWithValue(err.message || "Failed to upload media");
    }
  }
);

export const deleteMedia = createAsyncThunk(
  "artist/deleteMedia",
  async (mediaUrl: string, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState() as { venue: VenueState };
      const currentMedia = state.venue.profile?.mediaUrls || [];
      await dispatch(
        updateVenueProfile({
          mediaUrls: currentMedia.filter((url) => url !== mediaUrl),
        })
      );
      return mediaUrl;
    } catch (err: any) {
      toast.error(err.message || "Failed to delete media");
      return rejectWithValue(err.message || "Failed to delete media");
    }
  }
);

export const venueSlice = createSlice({
  name: "venue",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.uploading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenueProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchVenueProfile.fulfilled,
        (state, action: PayloadAction<Venue>) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
      .addCase(
        fetchVenueProfile.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    builder
      .addCase(createVenueProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createVenueProfile.fulfilled,
        (state, action: PayloadAction<Venue>) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
      .addCase(
        createVenueProfile.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(updateVenueProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateVenueProfile.fulfilled,
        (state, action: PayloadAction<Venue>) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
      .addCase(
        updateVenueProfile.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(uploadMedia.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadMedia.fulfilled, (state) => {
        state.uploading = false;
      })
      .addCase(uploadMedia.rejected, (state, action: PayloadAction<any>) => {
        state.uploading = false;
        state.error = action.payload;
      });
    builder

      .addCase(deleteMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMedia.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteMedia.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile, clearError } = venueSlice.actions;
export default venueSlice.reducer;
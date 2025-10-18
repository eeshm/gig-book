import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { Artist, CreateArtistData } from "@/types";
import toast from "react-hot-toast";

export interface ArtistState {
  profile: Artist | null;
  artists: Artist[];
  loading: boolean;
  error: string | null;
}
const initialState: ArtistState = {
  profile: null,
  artists: [],
  loading: false,
  error: null,
};

export const fetchMyArtistProfile = createAsyncThunk(
  "artist/fetchMyProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Artist>("/api/artists/me");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);
export const createArtistProfile = createAsyncThunk(
  "artist/createProfile",
  async (data: CreateArtistData, { rejectWithValue }) => {
    try {
      const response = await api.post<Artist>("/api/artists", data);
      toast.success("Artist profile created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create profile");
      return rejectWithValue(
        error.response?.data?.message || "Failed to create profile"
      );
    }
  }
);

export const updateArtistProfile = createAsyncThunk(
  "artist/updateProfile",
  async (
    { id, data }: { id: string; data: Partial<CreateArtistData> },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put<Artist>(`/api/artists/${id}`, data);
      toast.success("Artist profile updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);
export const fetchAllArtists = createAsyncThunk(
  "artist/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Artist[]>("/api/artists");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch artists"
      );
    }
  }
);
export const fetchArtistById = createAsyncThunk(
  "artist/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get<Artist>(`/api/artists/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch artist"
      );
    }
  }
);

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    clearArtistError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyArtistProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyArtistProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchMyArtistProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(createArtistProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(createArtistProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(createArtistProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateArtistProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateArtistProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateArtistProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder.addCase(fetchAllArtists.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllArtists.fulfilled, (state, action) => {
      state.loading = false;
      state.artists = action.payload;
    });
    builder.addCase(fetchAllArtists.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchArtistById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArtistById.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(fetchArtistById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearArtistError } = artistSlice.actions;
export default artistSlice.reducer;

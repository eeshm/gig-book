import { createSlice,createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { Artist } from "@/types";
import toast from "react-hot-toast";
import { tr } from "zod/v4/locales";

interface ArtistState{
    profile: Artist | null;
    loading: boolean;
    uploading: boolean;
    error: string | null;
}
const initialState: ArtistState={
    profile: null,
    loading: false,
    uploading: false,
    error: null,
};

export const fetchArtistProfile = createAsyncThunk(
    "artist/fetchProfile",
    async(artistId:string,{rejectWithValue})=>{
        try{
            const {data} = await api.get<{artist:Artist}>(`/artists/${artistId}`);
            return data.artist;
        }catch(err:any){
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

//Auto complete based on server folder structure
export const createArtistProfile = createAsyncThunk(
    "artist/createProfile",
    async(payload:
        {
            artistType: string;
            location: string;
            bio: string;
            pricePerGig: number;
            isAvailable: boolean;
            mediaUrls: string[];
        },{rejectWithValue})=>{
            try{
                const {data} = await api.post<{artist:Artist}>("/artists",payload);
                toast.success("Artist profile created successfully");
                return data.artist;
            }catch(err:any){
                toast.error(err.response?.data?.message || err.message);
                return rejectWithValue(err.response?.data?.message || "Failed to create profile");
            }
    }
);

export const updateArtistProfile = createAsyncThunk(
    "artist/updateProfile",
    async(payload:{
        artistType?: string;
        location?: string;
        bio?: string;
        pricePerGig?: number;
        isAvailable?: boolean;
        mediaUrls?: string[];
    },{rejectWithValue})=>{
        try{
            const {data} = await api.put<{artist:Artist}>(`/artists`,payload);
            toast.success("Artist profile updated successfully");
            return data.artist;
        }catch(err:any){
            toast.error(err.response?.data?.message || err.message);
            return rejectWithValue(err.response?.data?.message || "Failed to update profile");
        }
    }
);

export const uploadMedia = createAsyncThunk(
    "artist/uploadMedia",
    async(file:File,{getState,dispatch,rejectWithValue})=>{
        try{
            const formData = new FormData();
            formData.append("file",file);
            formData.append("upload_preset",process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
            const clouddinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
            const response = await fetch(clouddinaryUrl,{
                method:"POST",
                body:formData,
            });
            if(!response.ok){
                throw new Error("Failed to upload media");
            }
            const data = await response.json();
            const mediaUrl = data.secure_url;

            const state = getState() as {artist:ArtistState};
            const currentMedia = state.artist.profile?.mediaUrls || [];
            await dispatch(
                updateArtistProfile
                ({
                    mediaUrls:
                    [...currentMedia,mediaUrl]
                }));

                return mediaUrl;
            }catch(err:any){
                toast.error(err.message || "Failed to upload media");
                return rejectWithValue(err.message || "Failed to upload media");
            }
    }
);

export const deleteMedia = createAsyncThunk(
    "artist/deleteMedia",
    async(mediaUrl:string,{getState,dispatch,rejectWithValue})=>{
        try{
            const state = getState() as {artist:ArtistState};
            const currentMedia = state.artist.profile?.mediaUrls || [];
            await dispatch(
                updateArtistProfile({
                    mediaUrls: currentMedia.filter(url => url !== mediaUrl)
                })
            );
            return mediaUrl;
        }catch(err:any){
            toast.error(err.message || "Failed to delete media");
            return rejectWithValue(err.message || "Failed to delete media");
        }
    }
);

const artistSlice = createSlice({
    name:"artist",
    initialState,
    reducers:{
        clearError:(state)=>{
            state.error = null;
        },
        clearProfile:(state)=>{
            state.profile = null;
            state.loading = false;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchArtistProfile.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchArtistProfile.fulfilled,(state,action:PayloadAction<Artist>)=>{
            state.loading = false;
            state.profile = action.payload;
        })
        .addCase(fetchArtistProfile.rejected,(state,action:PayloadAction<any>)=>{
            state.loading = false;
            state.error = action.payload;
        })

     builder
        .addCase(createArtistProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
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
          state.error = null;
        })
        .addCase(updateArtistProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.profile = action.payload;
        })
        .addCase(updateArtistProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });     

    builder
        .addCase(uploadMedia.pending, (state) => {
          state.uploading = true;
          state.error = null;
        })
        .addCase(uploadMedia.fulfilled, (state) => {
          state.uploading = false;
        })
        .addCase(uploadMedia.rejected, (state, action) => {
          state.uploading = false;
          state.error = action.payload as string;
        });

    builder
        .addCase(deleteMedia.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteMedia.fulfilled, (state) => {
          state.loading = false;
        })
        .addCase(deleteMedia.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
});

export const {clearProfile , clearError} = artistSlice.actions;
export default artistSlice.reducer;
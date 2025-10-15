import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import { User, AuthResponse } from "@/types";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
//see if loading or state in AuthState

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    payload: {
      name: string;
      email: string;
      password: string;
      role: "ARTIST" | "VENUE";
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.post<AuthResponse>("/auth/register", payload);
      Cookies.set("token", data.token);
      return data.user;
    } catch (err: any) {
      return rejectWithValue(
        err.response.data.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async(
        payload:{email:string; password:string},
        {rejectWithValue}
    )=>{
        try{
            const {data} =await api.post<AuthResponse>("/auth/login", payload);
            Cookies.set("token", data.token);
            return data.user;
        }catch(err:any){
            return rejectWithValue(
                err.response.data.message || "Login failed"
            );
        }
    }
)

// export const loadUserFromToken = createAsyncThunk(
//     "auth/loadUser",
//     async(_, {rejectWithValue})=>{
//         const token = Cookies.get("token");
//         if(!token){
//             return rejectWithValue("No token found");
//         }
//         try{
//             const {data} = await api.get<AuthResponse>("/auth/me", {
//                 headers:{
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             return data.user;
//         }catch(err:any){
//             return rejectWithValue(
//                 err.response.data.message || "Failed to load user"
//             );
//         }
//     }
// )

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  Cookies.remove("token");
});

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser(state,action :PayloadAction<User | null>){
            state.user = action.payload;
        },
        clearError(state){
        state.error = null;
        },
    },

    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
        })

        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
        })

        builder
        .addCase(logoutUser.fulfilled,(state)=>{
            state.user=null;
        })
    },
})

export const {setUser, clearError} = authSlice.actions;
export default authSlice.reducer;
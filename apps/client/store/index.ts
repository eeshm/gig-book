import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import artistReducer from "./slices/artistSlice";
import venueReducer from "./slices/venueSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    artist: artistReducer,
    venue: venueReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

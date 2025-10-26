import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import artistReducer from "./slices/artistSlice";
import venueReducer from "./slices/venueSlice";
import bookingReducer from "./slices/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    artist: artistReducer,
    venue: venueReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

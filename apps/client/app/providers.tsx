"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect } from "react";
import { fetchCurrentUser } from "@/store/slices/authSlice";
import Cookies from "js-cookie";

function AuthInitializer() {
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      store.dispatch(fetchCurrentUser());
    }
  }, []);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      {children}
    </Provider>
  );
}
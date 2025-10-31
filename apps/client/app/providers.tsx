"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect, useRef } from "react";
import { fetchCurrentUser, setUser, clearUser } from "@/store/slices/authSlice";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import AuthInitializer from "@/components/shared/AuthInitializer";

function AuthSyncHandler() {
  const { data: session, status } = useSession();
  const syncedRef = useRef(false);
  const lastStatusRef = useRef<string | null>(null);
  const isInitializedRef = useRef(false);
  const reduxAuthStateRef = useRef<boolean | null>(null);

  useEffect(() => {
    // Don't do anything while NextAuth is still loading
    if (status === "loading") {
      return;
    }

    // Get current Redux auth state - this is the SOURCE OF TRUTH for non-OAuth logins
    const currentState = store.getState();
    const reduxHasAuth = currentState.auth.isAuthenticated && currentState.auth.user;

    // If Redux already has auth state from email-password signup, NEVER clear it
    if (reduxHasAuth && reduxAuthStateRef.current !== true) {
      reduxAuthStateRef.current = true;
      isInitializedRef.current = true;
    }

    // Handle NextAuth authenticated status - only sync once
    if (status === "authenticated" && session?.user && !syncedRef.current) {
      // Store the backend token in cookies if it exists (from Google OAuth or other OAuth)
      const accessToken = (session as any).accessToken;
      if (accessToken) {
        Cookies.set("token", accessToken, { expires: 7 });
      } else {
        // If no accessToken in session, check if we have a cookie token already
        const existingToken = Cookies.get("token");
      }

      store.dispatch(
        setUser({
          id: session.user.id || "",
          name: session.user.name || "",
          email: session.user.email || "",
          role: session.user.role || "ARTIST",
          image: (session.user as any).image || undefined,
        })
      );
      syncedRef.current = true;
      lastStatusRef.current = "authenticated";
      isInitializedRef.current = true;
    }
    // Handle initial unauthenticated state (e.g., initial page load or JWT token check)
    // SKIP this if Redux already has auth (from email-password signup)
    else if (status === "unauthenticated" && !isInitializedRef.current && !reduxHasAuth) {
      lastStatusRef.current = "unauthenticated";
      isInitializedRef.current = true;

      // Only try JWT token on initial load if not already authenticated
      const token = Cookies.get("token");
      if (token) {
        store.dispatch(fetchCurrentUser());
      } else {
        store.dispatch(clearUser());
      }
    }
    // Handle logout - transition from authenticated to unauthenticated
    else if (status === "unauthenticated" && lastStatusRef.current === "authenticated") {
      syncedRef.current = false;
      reduxAuthStateRef.current = false;
      store.dispatch(clearUser());
      lastStatusRef.current = "unauthenticated";
    }
  }, [status]); // Only depend on status, not session

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <Provider store={store}>
        <AuthSyncHandler />
        <AuthInitializer>{children}</AuthInitializer>
      </Provider>
    </SessionProvider>
  );
}

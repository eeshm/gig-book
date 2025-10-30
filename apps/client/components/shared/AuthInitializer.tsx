"use client";

import { useEffect, useState, useRef } from "react";
import { useAppSelector } from "@/store/hooks";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { loading } = useAppSelector((state) => state.auth);
  const [isInitializing, setIsInitializing] = useState(true);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only run initialization once
    if (!hasInitialized.current) {
      const timer = setTimeout(() => {
        setIsInitializing(false);
        hasInitialized.current = true;
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setIsInitializing(false);
    }
  }, []);

  // Show minimal loading during initial auth check
  if (isInitializing && loading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

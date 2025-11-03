"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const authLoading = useAppSelector((state) => state.auth.loading);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    // If auth has finished loading and user is not authenticated, redirect to login
    if (!authLoading && !isAuthenticated && !hasRedirected) {
      setHasRedirected(true);
      router.replace("/login");
    }
  }, [isAuthenticated, authLoading, router, hasRedirected]);

  // Show loading state while auth is being checked
  if (authLoading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  // If not authenticated, don't render children - user will be redirected
  if (!isAuthenticated) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" text="Redirecting..." />
      </div>
    );
  }

  // User is authenticated, render children
  return <>{children}</>;
}

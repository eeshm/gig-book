"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "./navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Hide navbar on auth pages
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/register");

  if (isAuthPage) {
    return null;
  }

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return <div className="h-16 lg:h-20" />; // Spacer to prevent layout shift
  }

  return <Navbar />;
}

"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on auth pages
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/register');
  
  if (isAuthPage) {
    return null;
  }
  
  return <Navbar />;
}

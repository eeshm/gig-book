"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { clearArtistProfile } from "@/store/slices/artistSlice";
import { clearVenueProfile } from "@/store/slices/venueSlice";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button2 } from "../ui/CustomButton";
import SidebarMenu from "@/public/src/assets/sidebar-menu";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearArtistProfile());
    dispatch(clearVenueProfile());
    router.push("/");
  };

  // Show skeleton/loading state while checking authentication
  const renderAuthButtons = () => {
    if (loading) {
      return (
        <div className="hidden h-full flex-1 items-center justify-end lg:flex">
          <div className="bg-muted h-10 w-24 animate-pulse rounded"></div>
        </div>
      );
    }

    if (isAuthenticated && user) {
      return (
        <>
          <Link
            href={user.role === "ARTIST" ? "/dashboard/artist" : "/dashboard/venue"}
            className="h-full"
          >
            <button className="lg:hover:bg-primary hover:bg-pink flex h-full w-full items-center justify-center bg-white text-lg text-black transition-colors duration-200 hover:text-black lg:w-auto lg:border-l-[1px] lg:px-6 lg:py-2">
              Dashboard
            </button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="lg:hover:bg-primary hover:bg-pink flex h-full w-full items-center justify-center border-black bg-black p-4 text-lg text-white transition-colors duration-200 hover:text-black lg:w-auto lg:border-l lg:px-6 lg:py-2">
                {user.name}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    }

    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-secondary lg:hover:bg-primary flex h-full w-full items-center justify-center text-lg text-black transition-colors duration-200 hover:text-black lg:w-auto lg:px-6">
              Get started
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href="/register?role=artist">Sign up as Artist</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/register?role=venue">Sign up as Venue</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/login" className="h-full">
          <button className="lg:hover:bg-primary flex h-full w-full items-center justify-center border-black bg-black p-4 text-lg text-white transition-colors duration-200 hover:text-black lg:w-auto lg:px-6">
            Log in
          </button>
        </Link>
      </>
    );
  };

  return (
    <>
      <header
        className={`font-family-oswald bg-background fixed inset-x-0 top-0 z-50 w-full ${isScrolled ? "border-b border-gray-400/20" : ""}`}
      >
        <div className="flex w-full justify-center">
          <div className="flex h-16 w-full px-4 sm:px-6 lg:h-20 lg:pr-0 lg:pl-9">
          {/* Left - Logo */}
          <div className="flex flex-1 items-center">
            <Link href="/" className="flex flex-shrink-0 items-center gap-3">
              <span className="text-secondary text-2xl font-bold tracking-tight">GigBook</span>
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <div className="hidden flex-1 items-center justify-center gap-12 text-gray-200 lg:flex">
            <Link href="/artists" className="text-sm font-medium transition-colors duration-200">
              Browse Artists
            </Link>
            <Link href="/venues" className="text-sm font-medium transition-colors duration-200">
              Browse Venues
            </Link>
          </div>

          {/* Right - Desktop Sign In & CTA */}
          <div className="hidden h-full flex-1 items-center justify-end lg:flex">
            {renderAuthButtons()}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? (
              <X size={24} />
            ) : (
              <SidebarMenu className="opacity-70 transition-opacity duration-400 hover:opacity-100" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Navigation - Half Width Slide from Right */}
      <div
        className={`font-family-oswald fixed top-0 right-0 bottom-0 z-50 w-[300px] transform border-l border-gray-400/20 bg-[#080706] transition-transform duration-600 ease-in-out lg:hidden ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="text-md flex h-full flex-col items-center font-normal text-white">
          <div className="flex w-full justify-between border-b border-gray-400/20 p-4">
            <h3 className="text-secondary text-2xl font-bold tracking-tight">GigBook</h3>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="text-white hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>
          <Link
            href="/artists"
            className="w-full py-4 text-center transition-colors"
            onClick={() => setIsMobileOpen(false)}
          >
            Browse Artists
          </Link>
          <Link
            href="/venues"
            className="w-full py-4 text-center transition-colors"
            onClick={() => setIsMobileOpen(false)}
          >
            Browse Venues
          </Link>
          <div className="flex w-full flex-col items-center">
            {isAuthenticated && user ? (
              <>
                <Link
                  href={user.role === "ARTIST" ? "/dashboard/artist" : "/dashboard/venue"}
                  className="w-full"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Button2 className="w-full">Dashboard</Button2>
                </Link>
                <Button2
                  onClick={() => {
                    handleLogout();
                    setIsMobileOpen(false);
                  }}
                  className="w-full"
                >
                  Logout
                </Button2>
              </>
            ) : (
              <>
                <Link href="/login" className="w-full" onClick={() => setIsMobileOpen(false)}>
                  <Button2 className="w-full">Sign In</Button2>
                </Link>
                <Link
                  href="/register?role=artist"
                  className="w-full"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Button2 className="w-full">Sign up as Artist</Button2>
                </Link>
                <Link
                  href="/register?role=venue"
                  className="w-full"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Button2 className="w-full">Sign up as Venue</Button2>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      </header>
      {/* Spacer to prevent content from being blocked by fixed navbar */}
      <div className="h-16 lg:h-20" />
    </>
  );
}

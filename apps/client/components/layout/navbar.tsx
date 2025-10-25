"use client";

import { useState } from "react";
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
        <div className="hidden lg:flex items-center h-full flex-1 justify-end">
          <div className="h-10 w-24 bg-muted animate-pulse rounded"></div>
        </div>
      );
    }

    if (isAuthenticated && user) {
      return (
        <>
          <Link
            href={user.role === "ARTIST" ? "/dashboard/artist" : "/dashboard/venue"}
            className="h-full "
          >
            <button className="flex w-full items-center bg-white text-black justify-center h-full  lg:hover:bg-primary text-lg transition-colors duration-200 hover:bg-pink hover:text-black lg:w-auto lg:border-l-[1px] lg:py-2 lg:px-6 ">
            Dashboard
            </button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
          <button className="flex w-full bg-black text-white  h-full items-center justify-center h-full lg:hover:bg-primary border-black p-4 text-lg text-white transition-colors duration-200 hover:bg-pink hover:text-black lg:w-auto lg:border-l lg:py-2 lg:px-6">
                {user.name}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    }

    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center bg-secondary text-black justify-center h-full  lg:hover:bg-primary text-lg transition-colors duration-200 hover:text-black lg:w-auto lg:px-6 ">
              Get started
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuItem asChild>
              <Link href="/register?role=artist">
                Sign up as Artist
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/register?role=venue">
                Sign up as Venue
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/login" className="h-full ">
          <button className="flex w-full bg-black text-white h-full items-center justify-center h-full lg:hover:bg-primary border-black p-4 text-lg text-white transition-colors duration-200 hover:text-black lg:w-auto lg:px-6">
            Log in 
          </button>
        </Link>
      </>
    );
  };

  return (
    <header className="sticky  font-family-oswald top-0 z-50 w-full bg-background  inset-x-0">
      <div className="w-full flex justify-center ">
        <div className="flex w-full h-16 lg:h-20 px-4 sm:px-6 lg:pl-9 lg:pr-0">
        {/* Left - Logo */}
        <div className="flex items-center flex-1">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <span className="text-2xl font-bold text-secondary tracking-tight">GigBook</span>
          </Link>
        </div>

        {/* Center - Desktop Navigation */}
        <div className="hidden items-center  text-gray-200 gap-12 lg:flex flex-1 justify-center">
          <Link
            href="/artists"
            className="text-sm font-medium transition-colors duration-200"
          >
            Browse Artists
          </Link>
          <Link
            href="/venues"
            className="text-sm font-medium transition-colors  duration-200"
          >
            Browse Venues
          </Link>
        </div>

        {/* Right - Desktop Sign In & CTA */}
        <div className="hidden lg:flex  items-center h-full flex-1 justify-end">
          {renderAuthButtons()}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden text-white"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} /> : <SidebarMenu className="opacity-70 hover:opacity-100 duration-400 transition transition-opacity"/>}
        </button>
      </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/80 lg:hidden z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Navigation - Half Width Slide from Right */}
      <div 
        className={`fixed right-0 top-0 bottom-0 font-family-oswald w-[300px] bg-[#080706] lg:hidden z-50 transform transition-transform duration-600 ease-in-out border-l border-gray-400/20 ${
          isMobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center h-full text-white text-md font-normal ">
          <div className="w-full flex justify-between p-4 border-b border-gray-400/20 ">
            <h3 className="text-2xl font-bold text-secondary tracking-tight">
              GigBook
            </h3>
            <button onClick={() => setIsMobileOpen(false)} className="text-white hover:text-gray-300">
              <X size={24} />
            </button>
          </div>
          <Link
            href="/artists"
            className=" transition-colors text-center py-4 w-full "
            onClick={() => setIsMobileOpen(false)}
          >
            Browse Artists
          </Link>
          <Link
            href="/venues"
            className="transition-colors py-4 text-center w-full "
            onClick={() => setIsMobileOpen(false)}
          >
            Browse Venues
          </Link>
          <div className="flex flex-col w-full items-center">
            {isAuthenticated && user ? (
              <>
                <Link 
                  href={user.role === "ARTIST" ? "/dashboard/artist" : "/dashboard/venue"} 
                  className="w-full"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Button2 className="w-full">
                    Dashboard
                  </Button2>
                </Link>
                <Button2 onClick={() => { handleLogout(); setIsMobileOpen(false); }} className="w-full">
                  Logout
                </Button2>
              </>
            ) : (
              <>
                <Link href="/login" className="w-full" onClick={() => setIsMobileOpen(false)}>
                  <Button2 className="w-full">
                    Sign In
                  </Button2>
                </Link>
                <Link href="/register?role=artist" className="w-full" onClick={() => setIsMobileOpen(false)}>
                  <Button2 className="w-full">
                    Sign up as Artist
                  </Button2>
                </Link>
                <Link href="/register?role=venue" className="w-full" onClick={() => setIsMobileOpen(false)}>
                  <Button2 className="w-full">
                    Sign up as Venue
                  </Button2>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
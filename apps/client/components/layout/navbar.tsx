"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { signOut } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { clearArtistProfile } from "@/store/slices/artistSlice";
import { clearVenueProfile } from "@/store/slices/venueSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SidebarMenu from "@/public/src/assets/sidebar-menu";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const loading = useAppSelector((state) => state.auth.loading);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(clearArtistProfile());
    dispatch(clearVenueProfile());
    try {
      await signOut({ redirect: false, callbackUrl: "/" });
    } catch (err) {
      console.warn("signOut error:", err);
    }
    router.replace("/");
  };

  const dashboardLink = useMemo(
    () => (user?.role === "ARTIST" ? "/dashboard/artist" : "/dashboard/venue"),
    [user?.role]
  );

  const renderAuthButtons = () => {
    if (loading) {
      return <div className="h-5 w-20 animate-pulse bg-white/10" />;
    }

    if (isAuthenticated && user) {
      return (
        <>
          <Link href={dashboardLink}>
            <button className="font-family-oswald border border-white/15 px-6 py-2 text-sm tracking-[0.18em] text-white/70 uppercase transition-all duration-200 hover:border-white/40 hover:text-white">
              Dashboard
            </button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-primary hover:bg-primary/85 font-family-oswald px-6 py-2 text-sm tracking-[0.18em] text-white uppercase transition-colors duration-200">
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
            <button className="font-family-oswald border border-white/15 px-6 py-2 text-sm tracking-[0.18em] text-white/60 uppercase transition-all duration-200 hover:border-white/40 hover:text-white">
              Get Started
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/register?role=artist">Sign up as Artist</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/register?role=venue">Sign up as Venue</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/login">
          <button className="bg-primary hover:bg-primary/85 font-family-oswald px-6 py-2 text-sm tracking-[0.18em] text-white uppercase transition-colors duration-200">
            Log In
          </button>
        </Link>
      </>
    );
  };

  return (
    <>
      <header
        className={`font-family-oswald fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "border-b border-white/8 bg-black/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-4 sm:px-8 lg:h-[60px] lg:px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary h-4 w-0.5" />
            <span className="font-family-oswald text-xl font-bold tracking-[0.1em] text-white uppercase">
              GigBook
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-10 lg:flex">
            {[
              { href: "/artists", label: "Artists" },
              { href: "/venues", label: "Venues" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-xs tracking-[0.25em] text-white/45 uppercase transition-colors duration-200 hover:text-white"
              >
                {link.label}
                <span className="bg-primary absolute -bottom-0.5 left-0 h-px w-0 transition-[width] duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop auth */}
          <div className="hidden items-center gap-3 lg:flex">{renderAuthButtons()}</div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="text-white/70 transition-colors hover:text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? (
              <X size={22} />
            ) : (
              <span className="relative inline-block opacity-70 transition-opacity hover:opacity-100">
                <SidebarMenu />
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16 lg:h-[60px]" />

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`font-family-oswald fixed top-0 right-0 bottom-0 z-50 w-[280px] transform border-l border-white/8 bg-[#060605] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col text-white">
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
            <div className="flex items-center gap-2">
              <div className="bg-primary h-4 w-0.5" />
              <span className="text-lg font-bold tracking-[0.1em] uppercase">GigBook</span>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="text-white/50 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex flex-col border-b border-white/8">
            {[
              { href: "/artists", label: "Browse Artists" },
              { href: "/venues", label: "Browse Venues" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="border-b border-white/5 px-6 py-4 text-sm tracking-[0.2em] text-white/55 uppercase last:border-0 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="flex flex-col gap-3 p-6">
            {isAuthenticated && user ? (
              <>
                <Link href={dashboardLink} onClick={() => setIsMobileOpen(false)}>
                  <button className="w-full border border-white/20 py-3 text-sm tracking-[0.2em] text-white uppercase hover:border-white/40">
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    handleLogout();
                  }}
                  className="bg-primary hover:bg-primary/85 w-full py-3 text-sm tracking-[0.2em] text-white uppercase"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMobileOpen(false)}>
                  <button className="bg-primary w-full py-3 text-sm tracking-[0.2em] text-white uppercase">
                    Log In
                  </button>
                </Link>
                <Link href="/register?role=artist" onClick={() => setIsMobileOpen(false)}>
                  <button className="w-full border border-white/20 py-3 text-sm tracking-[0.2em] text-white/60 uppercase hover:border-white/40 hover:text-white">
                    Join as Artist
                  </button>
                </Link>
                <Link href="/register?role=venue" onClick={() => setIsMobileOpen(false)}>
                  <button className="w-full border border-white/20 py-3 text-sm tracking-[0.2em] text-white/60 uppercase hover:border-white/40 hover:text-white">
                    Join as Venue
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-4">
        <nav className="flex max-w-7xl w-full items-center justify-between py-5">
        {/* Left - Logo */}
        <div className="flex items-center flex-1">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">♪</span>
            </div>
            <span className="text-2xl font-bold text-foreground tracking-tight">GigBook</span>
          </Link>
        </div>

        {/* Center - Desktop Navigation */}
        <div className="hidden items-center gap-12 lg:flex flex-1 justify-center">
          <Link
            href="/artists"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Browse Artists
          </Link>
          <Link
            href="/venues"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Browse Venues
          </Link>
        </div>

        {/* Right - Desktop Sign In & CTA */}
        <div className="hidden lg:flex gap-4 items-center flex-1 justify-end">
          {isAuthenticated && user ? (
            <>
              <Link
                href={user.role === "ARTIST" ? "/dashboard/artist" : "/dashboard/venue"}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Dashboard
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Sign In
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/login">
                      Sign in as Artist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/login">
                      Sign in as Venue
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/register">
                <Button>
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      </div>

      {/* Mobile Navigation */}
      {isMobileOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <div className="flex flex-col gap-4 px-4 py-5">
            <Link
              href="/artists"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse Artists
            </Link>
            <Link
              href="/venues"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse Venues
            </Link>
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              {isAuthenticated && user ? (
                <>
                  <Link href={user.role === "ARTIST" ? "/dashboard/artist" : "/dashboard/venue"}>
                    <Button variant="outline" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <span className="text-sm font-medium text-foreground text-center">{user.name}</span>
                  <Button onClick={handleLogout} className="w-full">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="w-full">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" className="w-full">
                    <Button className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
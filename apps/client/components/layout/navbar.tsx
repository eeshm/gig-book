"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">GigBook</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link href="/artists" className="text-sm text-muted-foreground hover:text-foreground transition">
              Browse Artists
            </Link>
            <Link href="/venues" className="text-sm text-muted-foreground hover:text-foreground transition">
              Browse Venues
            </Link>

            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href={user.role === "ARTIST" ? "/dashboard/artist" : "/dashboard/venue"}
                  className="text-sm text-muted-foreground hover:text-foreground transition"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-foreground">{user.name}</span>
                  <Button onClick={handleLogout} variant="outline" size="sm">
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
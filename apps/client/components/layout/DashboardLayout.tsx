"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { User, Music, Calendar, Home, X } from "lucide-react";
import { useState, useMemo } from "react";
import Image from "next/image";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  // Only select what we need to prevent unnecessary rerenders
  const user = useAppSelector((state) => state.auth.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Memoize computed values
  const isArtist = useMemo(() => user?.role === "ARTIST", [user?.role]);
  const dashboardLink = useMemo(
    () => (isArtist ? "/dashboard/artist" : "/dashboard/venue"),
    [isArtist]
  );

  const navItems = useMemo(
    () => [
      { href: dashboardLink, label: "Dashboard", icon: Home },
      { href: "/dashboard/bookings", label: "Bookings", icon: Calendar },
    ],
    [dashboardLink]
  );

  return (
    <div className="bg-background min-h-screen">
      {/* Mobile Header */}
      <div className="bg-card/80 border-primary/10 sticky top-0 z-40 flex items-center justify-between border-b border-dashed p-4 shadow-lg backdrop-blur-sm lg:hidden">
        <div className="flex items-center gap-3">
          {/* Profile avatar (clickable to toggle sidebar) */}
          <div className="flex items-center gap-3">
            {user?.image ? (
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20 transition-opacity hover:opacity-80"
                aria-label="Toggle menu"
              >
                <Image src={user.image} alt={`${user.name ?? "User"} avatar`} fill sizes="40px" className="object-cover" />
              </button>
            ) : (
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-primary/20 transition-opacity hover:opacity-80"
                aria-label="Toggle menu"
              >
                <span className="text-xs font-bold text-white">
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2) || "U"}
                </span>
              </button>
            )}

            <div>
              <p className="text-sm font-semibold text-white">{user?.name?.toUpperCase()}</p>
              <p className="text-xs text-white/50 capitalize">{user?.role?.toLowerCase()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`bg-card fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 transform overflow-y-auto border-r border-dashed p-4 transition-transform duration-600 ease-in-out lg:top-20 lg:h-[calc(100vh-5rem)] ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} `}
        >
          {/* User Info Card */}
          <div className="mb-8 p-4">
            <div className="flex items-center gap-2">
              {/* Show provider image if available, otherwise show initials */}
              {user?.image ? (
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/20">
                  <Image
                    src={user.image}
                    alt={`${user.name ?? "User"} avatar`}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-primary/20">
                  <span className="text-sm font-bold text-white">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2) || "U"}
                  </span>
                </div>
              )}
              <div>
                <p className="font-semibold text-white">{user?.name}</p>
                <p className="text-muted-foreground text-xs capitalize">
                  {user?.role?.toLowerCase()}
                </p>
              </div>
            </div>
          </div>

          <nav className="space-y-2 text-white">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center space-x-2 rounded-xs px-2 py-1 text-xs transition ${
                    isActive
                      ? "text-primary-foreground outline-border bg-white/10 outline-1 outline-offset-2"
                      : "text-whitehover:bg-white/10 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3 w-3 stroke-1" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 border-t border-dashed p-4 sm:p-6 lg:ml-64 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

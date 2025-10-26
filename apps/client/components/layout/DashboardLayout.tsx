"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { User, Music, Calendar, Home, Menu, X } from "lucide-react";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isArtist = user?.role === "ARTIST";
  const dashboardLink = isArtist ? "/dashboard/artist" : "/dashboard/venue";

  const navItems = [
    { href: dashboardLink, label: "Dashboard", icon: Home },
    { href: "/dashboard/bookings", label: "Bookings", icon: Calendar },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Mobile Header */}
      <div className="bg-card/80 border-primary/10 sticky top-0 z-40 flex items-center justify-between border-b border-dashed p-4 shadow-lg backdrop-blur-sm lg:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hover:bg-muted/10 rounded-lg border p-2 text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <X size={24} /> : <User size={24} />}
          </button>
          <div>
            <p className="text-sm font-semibold text-white">{user?.name.toUpperCase()}</p>
            <p className="text-xs text-white/50 capitalize">{user?.role?.toLowerCase()}</p>
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
          className={`bg-card fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 transform border-r border-dashed p-4 transition-transform duration-600 ease-in-out overflow-y-auto lg:top-20 lg:h-[calc(100vh-5rem)] ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} `}
        >
          {/* User Info Card */}
          <div className="mb-8 p-4">
            <div className="flex items-center gap-2">
              {isArtist ? (
                <div className="rounded-full border border-white/40 p-4">
                  <Music className="h-4 w-4 text-white" />
                </div>
              ) : (
                <div className="rounded-full border border-white/40 p-4">
                  <User className="h-4 w-4 text-white" />
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
        <main className="flex-1 border-t border-dashed p-4 sm:p-6 lg:p-8 lg:ml-64">{children}</main>
      </div>
    </div>
  );
}

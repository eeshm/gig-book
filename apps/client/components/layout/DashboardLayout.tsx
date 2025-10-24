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
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden bg-card/80 backdrop-blur-sm border-b border-dashed border-primary/10 p-4 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div>
            <p className="font-semibold text-sm text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role?.toLowerCase()}</p>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-50
            w-64 bg-card border-r  border-t border-dashed min-h-screen p-4
            transform transition-transform duration-600 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          {/* User Info Card */}
          <div className="mb-8 p-4 ">
            <div className="flex items-center gap-3">
                {isArtist ? (
                  <Music className="w-3 h-3 text-foreground" />
                ) : (
                  <User className="w-3 h-3 text-foreground" />
                )}
              <div>
                <p className="font-semibold text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role?.toLowerCase()}</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center space-x-2 text-xs px-2 py-1 rounded-xs transition ${
                    isActive
                      ? "bg-white/10 text-primary-foreground outline-1 outline-offset-2 outline-border"
                      : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-3 h-3 stroke-1" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 border-t border-dashed ">{children}</main>
      </div>
    </div>
  );
}
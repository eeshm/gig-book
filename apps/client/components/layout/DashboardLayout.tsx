"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { Calendar, Home, ChevronRight, Zap } from "lucide-react";
import { useState, useMemo } from "react";
import Image from "next/image";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <div className="bg-background min-h-screen">
      {/* Mobile Header */}
      <header className="border-border/30 bg-background/95 sticky top-0 z-40 flex items-center justify-between border-b px-4 py-3 backdrop-blur-md lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex items-center gap-3"
          aria-label="Toggle menu"
        >
          {user?.image ? (
            <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-amber-400/50">
              <Image
                src={user.image}
                alt={user.name ?? "User"}
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400/10 ring-2 ring-amber-400/40">
              <span className="font-[family-name:var(--font-family-oswald)] text-xs font-bold text-amber-400">
                {initials}
              </span>
            </div>
          )}
          <div className="text-left">
            <p className="text-foreground font-[family-name:var(--font-family-oswald)] text-sm font-semibold tracking-wider uppercase">
              {user?.name}
            </p>
            <p className="text-muted-foreground text-xs capitalize">{user?.role?.toLowerCase()}</p>
          </div>
        </button>
      </header>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`border-border/30 bg-background fixed top-14 left-0 z-50 flex h-[calc(100vh-3.5rem)] w-64 flex-col border-r transition-transform duration-300 ease-in-out lg:top-20 lg:h-[calc(100vh-5rem)] ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Sidebar header */}
          <div className="border-border/20 border-b px-6 py-6">
            <div className="mt-4 hidden lg:block">
              <div className="flex items-center gap-3">
                {user?.image ? (
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-amber-400/30">
                    <Image
                      src={user.image}
                      alt={user.name ?? "User"}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400/10 ring-2 ring-amber-400/30">
                    <span className="font-[family-name:var(--font-family-oswald)] text-sm font-bold text-amber-400">
                      {initials}
                    </span>
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-foreground truncate text-sm font-semibold">{user?.name}</p>
                  <p className="font-[family-name:var(--font-family-oswald)] text-xs tracking-widest text-amber-400/70 uppercase">
                    {user?.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-6">
            <p className="text-muted-foreground/60 mb-3 px-3 font-[family-name:var(--font-family-oswald)] text-xs tracking-widest uppercase">
              Navigation
            </p>
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-amber-400/10 text-amber-400"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-amber-400" : ""}`} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && <ChevronRight className="ml-auto h-3 w-3 text-amber-400/60" />}
                  </Link>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-h-screen flex-1 p-4 sm:p-6 lg:ml-64 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

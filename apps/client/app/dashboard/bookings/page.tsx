"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMyBookings } from "@/store/slices/bookingSlice";
import DashboardLayout from "@/components/layout/DashboardLayout";
import BookingCard from "@/components/booking/BookingCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { Calendar } from "lucide-react";
import { BookingStatus } from "@/types";

export default function BookingsPage() {
  const dispatch = useAppDispatch();
  const { bookings, loading } = useAppSelector((state) => state.booking);
  const { user: authUser, loading: authLoading } = useAppSelector((state) => state.auth);
  const [filter, setFilter] = useState<BookingStatus | "ALL">("ALL");

  useEffect(() => {
    // Only fetch bookings when auth is ready
    if (authUser && !authLoading) {
      dispatch(fetchMyBookings());
    }
  }, [authUser, authLoading, dispatch]);

  const filteredBookings =
    filter === "ALL" ? bookings : bookings.filter((booking) => booking.status === filter);

  const filters: Array<BookingStatus | "ALL"> = ["ALL", "PENDING", "ACCEPTED", "REJECTED"];

  const statusCount = (s: BookingStatus | "ALL") =>
    s === "ALL" ? bookings.length : bookings.filter((b) => b.status === s).length;

  const statColors: Record<string, string> = {
    ALL: "text-foreground",
    PENDING: "text-amber-400",
    ACCEPTED: "text-emerald-500",
    REJECTED: "text-red-400",
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner size="lg" text="Loading bookings..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-muted-foreground mb-1 font-[family-name:var(--font-family-oswald)] text-xs tracking-widest uppercase">
            Dashboard
          </p>
          <h1 className="text-foreground font-[family-name:var(--font-family-oswald)] text-3xl font-bold tracking-wide uppercase sm:text-4xl">
            My Bookings
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {authUser?.role === "ARTIST"
              ? "Manage your booking requests from venues"
              : "Track your booking requests to artists"}
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-amber-400/60 to-transparent" />
        </div>

        {/* Stats row */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {filters.map((s) => (
            <div key={s} className="border-border/40 bg-card rounded-xl border p-4">
              <p className={`font-mono text-2xl font-bold tabular-nums ${statColors[s]}`}>
                {statusCount(s)}
              </p>
              <p className="text-muted-foreground mt-1 text-xs capitalize">
                {s === "ALL" ? "Total" : s.toLowerCase()}
              </p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="border-border/30 mb-6 flex gap-1 border-b">
          {filters.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`relative px-4 py-2 font-[family-name:var(--font-family-oswald)] text-xs font-semibold tracking-wider uppercase transition-colors ${
                filter === status ? "text-amber-400" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {status}
              {filter === status && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-t-full bg-amber-400" />
              )}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title={filter === "ALL" ? "No Bookings Yet" : `No ${filter.toLowerCase()} bookings`}
            description={
              authUser?.role === "ARTIST"
                ? "When venues send you booking requests, they'll appear here."
                : "Start booking artists to see your requests here."
            }
          />
        ) : (
          <div className="grid gap-3">
            {filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

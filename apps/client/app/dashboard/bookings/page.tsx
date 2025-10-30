"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMyBookings } from "@/store/slices/bookingSlice";
import DashboardLayout from "@/components/layout/DashboardLayout";
import BookingCard from "@/components/booking/BookingCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
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
      console.log("📡 Fetching bookings for user:", authUser.id);
      dispatch(fetchMyBookings());
    }
  }, [authUser, authLoading, dispatch]);

  const filteredBookings =
    filter === "ALL" ? bookings : bookings.filter((booking) => booking.status === filter);

  const filters: Array<BookingStatus | "ALL"> = ["ALL", "PENDING", "ACCEPTED", "REJECTED"];

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner size="lg" text="Loading bookings..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-foreground heading mb-2 text-2xl font-bold sm:text-3xl">
            My Bookings
          </h1>
          <p className="text-muted-foreground subtext text-sm sm:text-base">
            {authUser?.role === "ARTIST"
              ? "Manage your booking requests from venues"
              : "Track your booking requests to artists"}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 grid grid-cols-4 gap-2 sm:flex sm:flex-wrap">
          {filters.map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              onClick={() => setFilter(status)}
              size="sm"
              className="w-full whitespace-nowrap sm:w-auto"
            >
              <span className="block text-xs sm:hidden">
                {status === "ALL" ? "All" : status.slice(0, 3)}
              </span>
              <span className="hidden sm:block">{status}</span>
              {status !== "ALL" && (
                <span className="ml-2 hidden text-xs opacity-75 sm:inline">
                  ({bookings.filter((b) => b.status === status).length})
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title={filter === "ALL" ? "No Bookings Yet" : `No ${filter.toLowerCase()} bookings`}
            description={
              authUser?.role === "ARTIST"
                ? "When venues send you booking requests, they will appear here."
                : "Start booking artists to see your requests here."
            }
          />
        ) : (
          <div className="grid gap-4">
            {filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

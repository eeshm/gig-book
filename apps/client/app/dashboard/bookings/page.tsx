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
  const { user } = useAppSelector((state) => state.auth);
  const [filter, setFilter] = useState<BookingStatus | "ALL">("ALL");

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  const filteredBookings =
    filter === "ALL"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground">
            {user?.role === "ARTIST"
              ? "Manage your booking requests from venues"
              : "Track your booking requests to artists"}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              onClick={() => setFilter(status)}
              size="sm"
            >
              {status}
              {status !== "ALL" && (
                <span className="ml-2 text-xs opacity-75">
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
            title={
              filter === "ALL"
                ? "No Bookings Yet"
                : `No ${filter.toLowerCase()} bookings`
            }
            description={
              user?.role === "ARTIST"
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
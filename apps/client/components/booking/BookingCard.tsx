"use client";

import { Booking } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateBookingStatus, deleteBooking } from "@/store/slices/bookingSlice";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, MessageSquare, Check, X, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const isArtist = user?.role === "ARTIST";
  const isVenue = user?.role === "VENUE";

  const handleAccept = async () => {
    const result = await dispatch(
      updateBookingStatus({ id: booking.id,status: "ACCEPTED" })
    );
    if (updateBookingStatus.fulfilled.match(result)) {
      toast.success("Booking accepted!");
    } else {
      toast.error("Failed to accept booking");
    }
  };

  const handleReject = async () => {
    const result = await dispatch(
      updateBookingStatus({ id: booking.id,status: "REJECTED"})
    );
    if (updateBookingStatus.fulfilled.match(result)) {
      toast.success("Booking rejected");
    } else {
      toast.error("Failed to reject booking");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    
    const result = await dispatch(deleteBooking(booking.id));
    if (deleteBooking.fulfilled.match(result)) {
      toast.success("Booking deleted");
    } else {
      toast.error("Failed to delete booking");
    }
  };

  const canDelete = booking.status === "PENDING" && isVenue;
  const canAcceptReject = booking.status === "PENDING" && isArtist;

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary transition">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {isArtist ? "Booking from Venue" : "Booking Request"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isArtist
              ? booking.venue?.venueName || "Venue"
              : booking.artist?.artistType || "Artist"}
          </p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-3 flex-shrink-0" />
          <span>{new Date(booking.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          })}</span>
        </div>

        {booking.artist && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-3 flex-shrink-0" />
            <span>{booking.artist.location}</span>
          </div>
        )}

        {booking.message && (
          <div className="flex items-start text-sm text-muted-foreground">
            <MessageSquare className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{booking.message}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      {canAcceptReject && (
        <div className="flex gap-3">
          <Button
            onClick={handleAccept}
            className="flex-1"
            size="sm"
          >
            <Check className="w-4 h-4 mr-2" />
            Accept
          </Button>
          <Button
            onClick={handleReject}
            variant="outline"
            className="flex-1"
            size="sm"
          >
            <X className="w-4 h-4 mr-2" />
            Reject
          </Button>
        </div>
      )}

      {canDelete && (
        <Button
          onClick={handleDelete}
          variant="destructive"
          className="w-full"
          size="sm"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Request
        </Button>
      )}

      {!canAcceptReject && !canDelete && booking.status !== "PENDING" && (
        <p className="text-xs text-muted-foreground text-center">
          {booking.status === "ACCEPTED"
            ? "This booking has been accepted"
            : "This booking has been rejected"}
        </p>
      )}
    </div>
  );
}
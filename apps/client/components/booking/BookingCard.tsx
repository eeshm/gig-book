"use client";

import { Booking } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateBookingStatus, deleteBooking } from "@/store/slices/bookingSlice";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, MessageSquare, Check, X, Trash2, Clock } from "lucide-react";
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
      updateBookingStatus({ id: booking.id, status: "ACCEPTED" })
    );
    if (updateBookingStatus.fulfilled.match(result)) {
      toast.success("Booking accepted!");
    } else {
      toast.error("Failed to accept booking");
    }
  };

  const handleReject = async () => {
    const result = await dispatch(
      updateBookingStatus({ id: booking.id, status: "REJECTED" })
    );
    if (updateBookingStatus.fulfilled.match(result)) {
      toast.success("Booking rejected");
    } else {
      toast.error("Failed to reject booking");
    }
  };

  const handleDelete = async () => {
    const result = await dispatch(deleteBooking(booking.id));
    if (deleteBooking.fulfilled.match(result)) {
      toast.success("Booking deleted");
    } else {
      toast.error("Failed to delete booking");
    }
  };

  const canDelete = booking.status === "PENDING" && isVenue;
  const canAcceptReject = booking.status === "PENDING" && isArtist;

  const formattedDate = new Date(booking.date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/40 hover:border-primary/30 transition-all duration-300 bg-card">
      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {isArtist ? booking.venue?.venueName || "Venue Booking" : booking.artist?.artistType || "Artist Booking"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isArtist
                ? `${booking.artist?.location || "Location TBA"}`
                : `${booking.venue?.venueName || "Venue TBA"}`}
            </p>
          </div>
          <div className="ml-4">
            <StatusBadge status={booking.status} />
          </div>
        </div>

        {/* Details Grid */}
        <div className="space-y-3 mb-6 pb-6 border-b border-border/40">
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-3 flex-shrink-0 text-primary/70" />
            <span className="font-medium text-foreground">{formattedDate}</span>
          </div>

          {booking.artist && (
            <div className="flex items-center text-sm">
              <MapPin className="w-4 h-4 mr-3 flex-shrink-0 text-primary/70" />
              <span className="text-muted-foreground">{booking.artist.location}</span>
            </div>
          )}

          {booking.message && (
            <div className="flex items-start text-sm">
              <MessageSquare className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0 text-primary/70" />
              <span className="text-muted-foreground line-clamp-3">{booking.message}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {canAcceptReject && (
            <>
              <Button
                onClick={handleAccept}
                className="flex-1 bg-green-600 hover:bg-green-700"
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
            </>
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
            <div className="flex items-center justify-center w-full py-2">
              <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {booking.status === "ACCEPTED"
                  ? "Booking confirmed"
                  : "Booking declined"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
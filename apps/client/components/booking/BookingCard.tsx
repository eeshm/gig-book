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
    const result = await dispatch(updateBookingStatus({ id: booking.id, status: "ACCEPTED" }));
    if (updateBookingStatus.fulfilled.match(result)) {
      toast.success("Booking accepted!");
    } else {
      toast.error("Failed to accept booking");
    }
  };

  const handleReject = async () => {
    const result = await dispatch(updateBookingStatus({ id: booking.id, status: "REJECTED" }));
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

  const statusAccent =
    {
      PENDING: "border-l-amber-400",
      ACCEPTED: "border-l-emerald-500",
      REJECTED: "border-l-red-500",
    }[booking.status] ?? "border-l-border";

  return (
    <div
      className={`bg-card border-border/40 relative overflow-hidden rounded-xl border border-l-[3px] transition-all duration-200 hover:shadow-lg hover:shadow-black/10 ${statusAccent}`}
    >
      <div className="p-5">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-foreground truncate font-[family-name:var(--font-family-oswald)] text-base font-semibold tracking-wide uppercase">
              {isArtist
                ? booking.venue?.venueName || "Venue Booking"
                : booking.artist?.artistType || "Artist Booking"}
            </h3>
            <p className="text-muted-foreground mt-0.5 text-xs">
              {isArtist ? booking.artist?.location : booking.venue?.venueName}
            </p>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        {/* Info row */}
        <div className="border-border/30 text-muted-foreground mb-4 flex flex-wrap gap-4 border-t pt-4 text-xs">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-amber-400/70" />
            <span className="text-foreground/80 font-mono">{formattedDate}</span>
          </div>
          {booking.artist?.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-amber-400/70" />
              <span>{booking.artist.location}</span>
            </div>
          )}
        </div>

        {booking.message && (
          <div className="border-border/20 bg-muted/40 mb-4 rounded-lg border px-3 py-2 text-xs">
            <div className="flex gap-2">
              <MessageSquare className="text-muted-foreground mt-0.5 h-3.5 w-3.5 shrink-0" />
              <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                {booking.message}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {canAcceptReject && (
            <>
              <Button
                onClick={handleAccept}
                size="sm"
                className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <Check className="mr-1.5 h-3.5 w-3.5" />
                Accept
              </Button>
              <Button onClick={handleReject} variant="outline" size="sm" className="flex-1">
                <X className="mr-1.5 h-3.5 w-3.5" />
                Reject
              </Button>
            </>
          )}
          {canDelete && (
            <Button onClick={handleDelete} variant="destructive" size="sm" className="w-full">
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              Delete Request
            </Button>
          )}
          {!canAcceptReject && !canDelete && (
            <div className="flex w-full items-center justify-center gap-2 py-1">
              <Clock className="text-muted-foreground h-3.5 w-3.5" />
              <p className="text-muted-foreground text-xs">
                {booking.status === "ACCEPTED" ? "Booking confirmed" : "Booking declined"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

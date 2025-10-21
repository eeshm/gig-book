"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch } from "@/store/hooks";
import { createBooking } from "@/store/slices/bookingSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";

const bookingSchema = z.object({
  date: z.string().min(1, "Date is required"),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface CreateBookingModalProps {
  artistId: string;
  artistName: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateBookingModal({
  artistId,
  artistName,
  onClose,
  onSuccess,
}: CreateBookingModalProps) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    const result = await dispatch(
      createBooking({
        artistId,
        date: data.date,
        message: data.message,
      })
    );

    if (createBooking.fulfilled.match(result)) {
      toast.success("Booking request sent successfully!");
      onSuccess?.();
      onClose();
    } else {
      toast.error("Failed to create booking request");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card p-8 rounded-xl border border-border max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Book Artist</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Sending request to {artistName}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Date */}
          <div>
            <Label htmlFor="date">Event Date</Label>
            <Input
              id="date"
              type="date"
              {...register("date")}
              className="mt-2"
              min={new Date().toISOString().split("T")[0]}
            />
            {errors.date && (
              <p className="text-sm text-destructive mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Tell the artist about your event..."
              {...register("message")}
              className="mt-2"
              rows={4}
            />
            {errors.message && (
              <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Request"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
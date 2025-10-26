"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { createBooking } from "@/store/slices/bookingSlice";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

const bookingSchema = z.object({
  date: z.string().min(1, "Date is required"),
  message: z.string().max(500, "Message must be less than 500 characters").optional(),
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
  const [date, setDate] = useState<Date>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
    clearErrors,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    const result = await dispatch(
      createBooking({
        artistId,
        date: data.date,
        message: data.message || undefined,
      })
    );

    if (createBooking.fulfilled.match(result)) {
      toast.success("Booking request sent successfully!");
      onSuccess?.();
      onClose();
    } else {
      const errorMessage = (result.payload as string) || "Failed to create booking request";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-card border-border w-full max-w-md rounded-xl border p-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-foreground text-2xl font-bold">Book Artist</h2>
            <p className="text-muted-foreground mt-1 text-sm">Sending request to {artistName}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Date */}
          <div>
            <Label htmlFor="date">Event Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "mt-2 w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    if (selectedDate) {
                      setValue("date", format(selectedDate, "yyyy-MM-dd"));
                      clearErrors("date");
                    }
                  }}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date && <p className="text-destructive mt-1 text-sm">{errors.date.message}</p>}
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
              <p className="text-destructive mt-1 text-sm">{errors.message.message}</p>
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

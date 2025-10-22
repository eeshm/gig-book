"use client";

import { useEffect } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Artist, Venue, CreateArtistData, CreateVenueData } from "@/types";

// Artist Form Schema - matching backend enum
const artistSchema = z.object({
  artistType: z.enum(["DJ", "LIVE_PERFORMER", "SINGER", "INSTRUMENTALIST", "BAND", "OTHER"], {
    message: "Please select a valid artist type",
  }),
  location: z.string().min(2, "Location is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  pricePerGig: z.number().min(0, "Price must be a positive number"),
});

// Venue Form Schema
const venueSchema = z.object({
  venueName: z.string().min(2, "Venue name is required"),
  location: z.string().min(2, "Location is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  capacity: z.number().min(0, "Capacity must be a positive number").optional(),
  venueType: z.string().optional(),
});

type ArtistFormData = z.infer<typeof artistSchema>;
type VenueFormData = z.infer<typeof venueSchema>;

interface ProfileFormProps {
  role: "ARTIST" | "VENUE";
  initialData?: Artist | Venue | null;
  onSubmit: (data: CreateArtistData | CreateVenueData) => void;
  loading?: boolean;
}

export default function ProfileForm({
  role,
  initialData,
  onSubmit,
  loading = false,
}: ProfileFormProps) {
  const isArtist = role === "ARTIST";
  const schema = isArtist ? artistSchema : venueSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData
      ? isArtist
        ? {
            artistType: (initialData as Artist).artistType,
            location: initialData.location,
            bio: (initialData as Artist).bio,
            pricePerGig: (initialData as Artist).pricePerGig,
          }
        : {
            venueName: (initialData as Venue).venueName,
            location: initialData.location,
            description: (initialData as Venue).description,
            capacity: (initialData as Venue).capacity,
            venueType: (initialData as Venue).venueType,
          }
      : undefined,
  });

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      if (isArtist) {
        reset({
          artistType: (initialData as Artist).artistType,
          location: initialData.location,
          bio: (initialData as Artist).bio,
          pricePerGig: (initialData as Artist).pricePerGig,
        });
      } else {
        reset({
          venueName: (initialData as Venue).venueName,
          location: initialData.location,
          description: (initialData as Venue).description,
          capacity: (initialData as Venue).capacity,
          venueType: (initialData as Venue).venueType,
        });
      }
    }
  }, [initialData, isArtist, reset]);

  const handleFormSubmit = (data: ArtistFormData | VenueFormData) => {
    // Clean up empty optional fields for venue
    if (!isArtist) {
      const venueData = data as VenueFormData;
      // Remove venueType if it's empty
      if (!venueData.venueType || venueData.venueType.trim() === '') {
        delete venueData.venueType;
      }
    }
    onSubmit(data as CreateArtistData | CreateVenueData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {isArtist ? (
        <>
          {/* Artist Type */}
          <div>
            <Label htmlFor="artistType">Artist Type</Label>
            <select
              id="artistType"
              {...register("artistType")}
              className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select artist type</option>
              <option value="DJ">DJ</option>
              <option value="LIVE_PERFORMER">Live Performer</option>
              <option value="SINGER">Singer</option>
              <option value="INSTRUMENTALIST">Instrumentalist</option>
              <option value="BAND">Band</option>
              <option value="OTHER">Other</option>
            </select>
            {(errors as FieldErrors<ArtistFormData>).artistType && (
              <p className="text-sm text-destructive mt-1">{(errors as FieldErrors<ArtistFormData>).artistType?.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              placeholder="e.g., New York, NY"
              {...register("location")}
              className="mt-2"
            />
            {(errors as FieldErrors<ArtistFormData>).location && (
              <p className="text-sm text-destructive mt-1">{(errors as FieldErrors<ArtistFormData>).location?.message}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell venues about your experience and style..."
              {...register("bio")}
              className="mt-2"
              rows={4}
            />
            {(errors as FieldErrors<ArtistFormData>).bio && <p className="text-sm text-destructive mt-1">{(errors as FieldErrors<ArtistFormData>).bio?.message}</p>}
          </div>

          {/* Price Per Gig */}
          <div>
            <Label htmlFor="pricePerGig">Price Per Gig ($)</Label>
            <Input
              id="pricePerGig"
              type="number"
              placeholder="e.g., 500"
              {...register("pricePerGig", { valueAsNumber: true })}
              className="mt-2"
            />
            {(errors as FieldErrors<ArtistFormData>).pricePerGig && (
              <p className="text-sm text-destructive mt-1">{(errors as FieldErrors<ArtistFormData>).pricePerGig?.message}</p>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Venue Name */}
          <div>
            <Label htmlFor="venueName">Venue Name</Label>
            <Input
              id="venueName"
              type="text"
              placeholder="e.g., Blue Note Jazz Club"
              {...register("venueName")}
              className="mt-2"
            />
            {(errors as FieldErrors<VenueFormData>).venueName && <p className="text-sm text-destructive mt-1">{(errors as FieldErrors<VenueFormData>).venueName?.message}</p>}
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              placeholder="e.g., Los Angeles, CA"
              {...register("location")}
              className="mt-2"
            />
            {(errors as FieldErrors<VenueFormData>).location && (
              <p className="text-sm text-destructive mt-1">{(errors as FieldErrors<VenueFormData>).location?.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your venue, atmosphere, and events..."
              {...register("description")}
              className="mt-2"
              rows={4}
            />
            {(errors as FieldErrors<VenueFormData>).description && (
              <p className="text-sm text-destructive mt-1">{(errors as FieldErrors<VenueFormData>).description?.message}</p>
            )}
          </div>

          {/* Venue Type */}
          <div>
            <Label htmlFor="venueType">Venue Type</Label>
            <Input
              id="venueType"
              type="text"
              placeholder="e.g., Club, Restaurant, Bar"
              {...register("venueType")}
              className="mt-2"
            />
            {(errors as FieldErrors<VenueFormData>).venueType && (
              <p className="text-sm text-destructive mt-1">{(errors as FieldErrors<VenueFormData>).venueType?.message}</p>
            )}
          </div>

          {/* Capacity */}
          <div>
            <Label htmlFor="capacity">Capacity (optional)</Label>
            <Input
              id="capacity"
              type="number"
              placeholder="e.g., 200"
              {...register("capacity", { 
                setValueAs: (v) => v === "" || v === null ? undefined : parseInt(v, 10)
              })}
              className="mt-2"
            />
            {(errors as FieldErrors<VenueFormData>).capacity && (
              <p className="text-sm text-destructive mt-1">{(errors as FieldErrors<VenueFormData>).capacity?.message}</p>
            )}
          </div>
        </>
      )}

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Saving..." : initialData ? "Update Profile" : "Create Profile"}
      </Button>
    </form>
  );
}
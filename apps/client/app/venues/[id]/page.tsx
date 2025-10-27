"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchVenueById } from "@/store/slices/venueSlice";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Building2, ArrowLeft} from "lucide-react";
import Image from "next/image";

export default function SingleVenuePage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { profile: venue, loading } = useAppSelector((state) => state.venue);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchVenueById(params.id as string));
    }
  }, [dispatch, params.id]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen">
        <LoadingSpinner size="lg" text="Loading venue..." />
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Venue not found</p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="group text-foreground/70 hover:text-primary mb-8 flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: Media Gallery */}
          <div className="lg:col-span-2">
            {venue.mediaUrls && venue.mediaUrls.length > 0 ? (
              <div className="space-y-4">
                {/* Main Media */}
                <div className="bg-muted group relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
                  <div className="from-primary/10 to-primary/5 absolute inset-0 z-10 bg-gradient-to-br via-transparent transition-opacity group-hover:opacity-0" />
                  {venue.mediaUrls[0]?.includes("video") ? (
                    <video
                      src={venue.mediaUrls[0]}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      controls
                    />
                  ) : (
                    <Image
                      src={venue.mediaUrls[0] as string}
                      alt={venue.venueName}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {venue.mediaUrls.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {venue.mediaUrls.slice(1, 5).map((url, index) => (
                      <div
                        key={index}
                        className="bg-muted group/thumb aspect-square cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl"
                      >
                        <div className="bg-primary/20 absolute inset-0 z-10 opacity-0 transition-opacity group-hover/thumb:opacity-100" />
                        {url.includes("video") ? (
                          <video
                            src={url}
                            className="h-full w-full object-cover transition-transform group-hover/thumb:scale-110"
                          />
                        ) : (
                          <Image
                            src={url}
                            alt={`Media ${index + 2}`}
                            className="h-full w-full object-cover transition-transform group-hover/thumb:scale-110"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="from-muted to-muted/50 flex aspect-video flex-col items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg">
                <Building2 className="text-muted-foreground/30 mb-4 h-16 w-16" />
                <p className="text-muted-foreground">No media available</p>
              </div>
            )}
          </div>

          {/* Right: Venue Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Card with gradient border effect */}
              <div className="relative">
                <div className="bg-card/80 relative shadow-xl">
                  {/* Header */}
                  <div className="mb-6 pr-4">
                    <h1 className="text-foreground mb-2 text-4xl font-bold">{venue.venueName}</h1>
                    {venue.venueType && (
                      <p className="text-foreground/60 mb-3 text-sm font-medium tracking-wide uppercase">
                        {venue.venueType}
                      </p>
                    )}
                    <div className="from-primary via-primary/40 h-1 w-20 rounded-full bg-gradient-to-r to-transparent" />
                  </div>

                  {/* Details */}
                  <div className="mb-8 space-y-4">
                    <div className="flex items-center gap-3 rounded-lg transition-colors">
                      <MapPin className="text-secondary h-5 w-5 flex-shrink-0" />
                      <span className="text-foreground/90">{venue.location}</span>
                    </div>

                    {venue.capacity && (
                      <div className="from-primary/10 to-primary/5 flex items-center gap-3 rounded-lg bg-gradient-to-r p-3">
                        <Users className="text-primary h-5 w-5 flex-shrink-0" />
                        <div>
                          <span className="text-foreground text-lg font-bold">
                            {venue.capacity}
                          </span>
                          <span className="text-foreground/60 ml-2 text-xs">people capacity</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Description Section */}
                  <div className="mb-8">
                    <h3 className="text-foreground mb-3 text-lg font-semibold">About This Venue</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {venue.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className="from-primary to-primary/80 hover:shadow-primary/50 h-12 w-full rounded-lg bg-gradient-to-r text-base font-semibold transition-all hover:shadow-lg"
                    onClick={() => router.push("/artists")}
                  >
                    <Building2 className="mr-2 h-4 w-4" />
                    Browse Artists
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

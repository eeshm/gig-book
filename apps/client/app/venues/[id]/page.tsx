"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchVenueById } from "@/store/slices/venueSlice";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Building2, ArrowLeft, Sparkles } from "lucide-react";

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
      <div className="min-h-screen bg-background">
        <LoadingSpinner size="lg" text="Loading venue..." />
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Venue not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Media Gallery */}
          <div className="lg:col-span-2">
            {venue.mediaUrls && venue.mediaUrls.length > 0 ? (
              <div className="space-y-4">
                {/* Main Media */}
                <div className="aspect-video bg-muted rounded-2xl overflow-hidden shadow-2xl group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 group-hover:opacity-0 transition-opacity z-10" />
                  {venue.mediaUrls[0]?.includes("video") ? (
                    <video
                      src={venue.mediaUrls[0]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      controls
                    />
                  ) : (
                    <img
                      src={venue.mediaUrls[0]}
                      alt={venue.venueName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {venue.mediaUrls.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {venue.mediaUrls.slice(1, 5).map((url, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-muted rounded-lg overflow-hidden shadow-lg cursor-pointer group/thumb hover:shadow-xl transition-all"
                      >
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/thumb:opacity-100 transition-opacity z-10" />
                        {url.includes("video") ? (
                          <video
                            src={url}
                            className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform"
                          />
                        ) : (
                          <img
                            src={url}
                            alt={`Media ${index + 2}`}
                            className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-2xl flex flex-col items-center justify-center shadow-lg">
                <Building2 className="w-16 h-16 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">No media available</p>
              </div>
            )}
          </div>

          {/* Right: Venue Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Card with gradient border effect */}
              <div className="relative">
                <div className="relative bg-card/80  shadow-xl">
                  {/* Header */}
                  <div className="mb-6 pr-4">
                    <h1 className="text-4xl font-bold text-foreground mb-2">
                      {venue.venueName}
                    </h1>
                    {venue.venueType && (
                      <p className="text-sm text-foreground/60 font-medium uppercase tracking-wide mb-3">
                        {venue.venueType}
                      </p>
                    )}
                    <div className="h-1 w-20 bg-gradient-to-r from-primary via-primary/40 to-transparent rounded-full" />
                  </div>

                  {/* Details */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3  rounded-lg  transition-colors">
                      <MapPin className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="text-foreground/90">{venue.location}</span>
                    </div>

                    {venue.capacity && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5">
                        <Users className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <span className="text-lg font-bold text-foreground">
                            {venue.capacity}
                          </span>
                          <span className="text-xs text-foreground/60 ml-2">people capacity</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Description Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-foreground mb-3">About This Venue</h3>
                    <p className="text-foreground/70 leading-relaxed text-sm">{venue.description}</p>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/50 transition-all rounded-lg"
                    onClick={() => router.push("/artists")}
                  >
                    <Building2 className="w-4 h-4 mr-2" />
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
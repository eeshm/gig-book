"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchArtistById } from "@/store/slices/artistSlice";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft, Music, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";
import CreateBookingModal from "@/components/booking/CreateBookingModal";

export default function SingleArtistPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { profile: artist, loading } = useAppSelector((state) => state.artist);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [mainMediaIndex, setMainMediaIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchArtistById(params.id as string));
    }
  }, [dispatch, params.id]);

  const handleBookClick = () => {
    if (!isAuthenticated) {
      toast.error("Please login to book this artist");
      router.push("/login");
      return;
    }

    if (user?.role !== "VENUE") {
      toast.error("Only venues can book artists");
      return;
    }

    setShowBookingModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <LoadingSpinner size="lg" text="Loading artist..." />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Artist not found</p>
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
            {artist.mediaUrls && artist.mediaUrls.length > 0 ? (
              <div className="space-y-4">
                {/* Main Media */}
                <div className="aspect-video bg-muted rounded-2xl overflow-hidden shadow-2xl group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 group-hover:opacity-0 transition-opacity z-10" />
                  {artist.mediaUrls[mainMediaIndex]?.includes("video") ? (
                    <video
                      src={artist.mediaUrls[mainMediaIndex]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      controls
                    />
                  ) : (
                    <img
                      src={artist.mediaUrls[mainMediaIndex]}
                      alt={artist.artistType}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {artist.mediaUrls.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {artist.mediaUrls.map((url, index) => (
                      mainMediaIndex !== index && (
                        <div
                          key={index}
                          onClick={() => setMainMediaIndex(index)}
                          className={`aspect-square bg-muted rounded-lg overflow-hidden shadow-lg cursor-pointer group/thumb hover:shadow-xl transition-all`}
                        >
                          {url.includes("video") ? (
                            <video
                              src={url}
                              className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform"
                            />
                          ) : (
                            <img
                              src={url}
                              alt={`Media ${index + 1}`}
                              className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform"
                            />
                          )}
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-2xl flex flex-col items-center justify-center shadow-lg">
                <Music className="w-16 h-16 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">No media available</p>
              </div>
            )}
          </div>

          {/* Right: Artist Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Card with gradient border effect */}
              <div className="relative">
                  {/* Header */}
                  <div className="mb-6 pr-4">
                    <h1 className="text-4xl font-bold text-foreground mb-2">
                      {artist.artistType}
                    </h1>
                    <div className="h-1 w-20 bg-gradient-to-r from-primary via-primary/40 to-transparent rounded-full" />
                  </div>

                  {/* Details */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 p-3 ">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground/90">{artist.location}</span>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5">
                      <div>
                        <span className="text-2xl font-bold text-foreground">
                          $ {artist.pricePerGig}
                        </span>
                        <span className="text-xs text-foreground/60 ml-2">per gig</span>
                      </div>
                    </div>
                  </div>

                  {/* About Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-foreground mb-3">About This Artist</h3>
                    <p className="text-foreground/70 leading-relaxed text-sm">{artist.bio}</p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    {isAuthenticated && user?.role === "VENUE" && (
                      <Button
                        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/50 transition-all rounded-lg"
                        onClick={handleBookClick}
                      >
                        <Music className="w-4 h-4 mr-2" />
                        Book This Artist
                      </Button>
                    )}

                    {!isAuthenticated && (
                      <Button
                        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/50 transition-all rounded-lg"
                        onClick={() => router.push("/login")}
                      >
                        Login to Book
                      </Button>
                    )}

                    {isAuthenticated && user?.role === "ARTIST" && (
                      <div className="p-4 rounded-lg border border-2 text-center">
                        <p className="text-sm text-muted-foreground">
                          Only venues can book artists
                        </p>
                      </div>
                    )}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && artist && (
        <CreateBookingModal
          artistId={artist.id}
          artistName={artist.artistType}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}
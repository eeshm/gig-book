"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchArtistById } from "@/store/slices/artistSlice";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import CreateBookingModal from "@/components/booking/CreateBookingModal";

export default function SingleArtistPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { profile: artist, loading } = useAppSelector((state) => state.artist);
  const [showBookingModal, setShowBookingModal] = useState(false);

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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Media Gallery */}
          <div>
            {artist.mediaUrls && artist.mediaUrls.length > 0 ? (
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-xl overflow-hidden">
                  {artist.mediaUrls[0]?.includes("video") ? (
                    <video
                      src={artist.mediaUrls[0]}
                      className="w-full h-full object-cover"
                      controls
                    />
                  ) : (
                    <img
                      src={artist.mediaUrls[0]}
                      alt={artist.artistType}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {artist.mediaUrls.length > 1 && (
                  <div className="grid grid-cols-3 gap-4">
                    {artist.mediaUrls.slice(1).map((url, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-muted rounded-lg overflow-hidden"
                      >
                        {url.includes("video") ? (
                          <video
                            src={url}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={url}
                            alt={`Media ${index + 2}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                <p className="text-muted-foreground">No media available</p>
              </div>
            )}
          </div>

          {/* Right: Artist Info */}
          <div>
            <div className="bg-card p-8 rounded-xl border border-border">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {artist.artistType}
              </h1>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>{artist.location}</span>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <DollarSign className="w-5 h-5 mr-3" />
                  <span className="text-lg font-semibold text-foreground">
                    ${artist.pricePerGig}
                  </span>
                  <span className="ml-2">per gig</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">About</h3>
                <p className="text-muted-foreground leading-relaxed">{artist.bio}</p>
              </div>

              {isAuthenticated && user?.role === "VENUE" && (
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleBookClick}
                >
                  Book This Artist
                </Button>
              )}

              {!isAuthenticated && (
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => router.push("/login")}
                >
                  Login to Book
                </Button>
              )}

              {isAuthenticated && user?.role === "ARTIST" && (
                <p className="text-sm text-muted-foreground text-center">
                  Only venues can book artists
                </p>
              )}
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
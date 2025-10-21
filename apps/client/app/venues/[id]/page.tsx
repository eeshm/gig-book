"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Venue } from "@/types";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Building2, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

export default function SingleVenuePage() {
  const params = useParams();
  const router = useRouter();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await api.get<Venue>(`/api/venues/${params.id}`);
        setVenue(response.data);
      } catch (error) {
        toast.error("Failed to load venue");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchVenue();
    }
  }, [params.id]);

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="bg-card p-8 rounded-xl border border-border">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {venue.venueName}
              </h1>
              {venue.venueType && (
                <p className="text-lg text-muted-foreground">{venue.venueType}</p>
              )}
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>{venue.location}</span>
            </div>

            {venue.capacity && (
              <div className="flex items-center text-muted-foreground">
                <Users className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>Capacity: {venue.capacity} people</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">About This Venue</h3>
            <p className="text-muted-foreground leading-relaxed">{venue.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
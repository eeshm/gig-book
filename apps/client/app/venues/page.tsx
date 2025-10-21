"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAllVenues } from "@/store/slices/venueSlice";
import BrowseCard from "@/components/browse/BrowseCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { Building2 } from "lucide-react";

export default function BrowseVenuesPage() {
  const dispatch = useAppDispatch();
  const { venues, loading } = useAppSelector((state) => state.venue);

  useEffect(() => {
    dispatch(fetchAllVenues());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <LoadingSpinner size="lg" text="Loading venues..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Browse Venues</h1>
          <p className="text-muted-foreground">
            Explore amazing venues for your performances
          </p>
        </div>

        {/* Venues Grid */}
        {venues.length === 0 ? (
          <EmptyState
            icon={Building2}
            title="No Venues Found"
            description="There are no venues available at the moment. Check back later!"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <BrowseCard key={venue.id} type="venue" data={venue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
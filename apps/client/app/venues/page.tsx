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
      <div className="bg-background min-h-screen">
        <LoadingSpinner size="lg" text="Loading venues..." />
      </div>
    );
  }

  // Ensure venues is always an array
  const venuesList = Array.isArray(venues) ? venues : [];

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="headingwhite">Browse Venues</h1>
          <p className="subtext">Explore amazing venues for your performances</p>
        </div>

        {/* Venues Grid */}
        {venuesList.length === 0 ? (
          <EmptyState
            icon={Building2}
            title="No Venues Found"
            description="There are no venues available at the moment. Check back later!"
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {venuesList.map((venue) => (
              <BrowseCard key={venue.id} type="venue" data={venue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

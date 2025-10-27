"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAllArtists } from "@/store/slices/artistSlice";
import BrowseCard from "@/components/browse/BrowseCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { Music } from "lucide-react";

export default function BrowseArtistsPage() {
  const dispatch = useAppDispatch();
  const { artists, loading } = useAppSelector((state) => state.artist);

  useEffect(() => {
    dispatch(fetchAllArtists());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen">
        <LoadingSpinner size="lg" text="Loading artists..." />
      </div>
    );
  } 

  // Ensure artists is always an array
  const artistsList = Array.isArray(artists) ? artists : [];

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="headingwhite">Browse Artists</h1>
          <p className="subtext">Discover talented artists for your next event</p>
        </div>

        {/* Artists Grid */}
        {artistsList.length === 0 ? (
          <EmptyState
            icon={Music}
            title="No Artists Found"
            description="There are no artists available at the moment. Check back later!"
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {artistsList.map((artist) => (
              <BrowseCard key={artist.id} type="artist" data={artist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

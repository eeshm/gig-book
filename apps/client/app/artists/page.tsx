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
      <div className="min-h-screen bg-background">
        <LoadingSpinner size="lg" text="Loading artists..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Browse Artists</h1>
          <p className="text-muted-foreground">
            Discover talented artists for your next event
          </p>
        </div>

        {/* Artists Grid */}
        {artists.length === 0 ? (
          <EmptyState
            icon={Music}
            title="No Artists Found"
            description="There are no artists available at the moment. Check back later!"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist) => (
              <BrowseCard key={artist.id} type="artist" data={artist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
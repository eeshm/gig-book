import BrowseCard from "@/components/browse/BrowseCard";
import EmptyState from "@/components/shared/EmptyState";
import { Music } from "lucide-react";
import { Artist } from "@/types";

async function getArtists(): Promise<Artist[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artists`, {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.artists) ? data.artists : [];
  } catch {
    return [];
  }
}

export default async function BrowseArtistsPage() {
  const artists = await getArtists();

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="headingwhite">Browse Artists</h1>
          <p className="subtext">Discover talented artists for your next event</p>
        </div>

        {/* Artists Grid */}
        {artists.length === 0 ? (
          <EmptyState
            icon={Music}
            title="No Artists Found"
            description="There are no artists available at the moment. Check back later!"
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist) => (
              <BrowseCard key={artist.id} type="artist" data={artist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

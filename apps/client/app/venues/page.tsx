import BrowseCard from "@/components/browse/BrowseCard";
import EmptyState from "@/components/shared/EmptyState";
import { Building2 } from "lucide-react";
import { Venue } from "@/types";

async function getVenues(): Promise<Venue[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/venues`, {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.venues) ? data.venues : [];
  } catch {
    return [];
  }
}

export default async function BrowseVenuesPage() {
  const venues = await getVenues();

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="headingwhite">Browse Venues</h1>
          <p className="subtext">Explore amazing venues for your performances</p>
        </div>

        {/* Venues Grid */}
        {venues.length === 0 ? (
          <EmptyState
            icon={Building2}
            title="No Venues Found"
            description="There are no venues available at the moment. Check back later!"
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {venues.map((venue) => (
              <BrowseCard key={venue.id} type="venue" data={venue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

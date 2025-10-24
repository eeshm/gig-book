"use client";

import Link from "next/link";
import { Artist, Venue } from "@/types";
import { MapPin, Users, Music } from "lucide-react";

interface BrowseCardProps {
  type: "artist" | "venue";
  data: Artist | Venue;
}

export default function BrowseCard({ type, data }: BrowseCardProps) {
  const isArtist = type === "artist";
  const artist = isArtist ? (data as Artist) : null;
  const venue = !isArtist ? (data as Venue) : null;

  const href = isArtist ? `/artists/${data.id}` : `/venues/${data.id}`;
  const imageUrl = isArtist
    ? artist?.mediaUrls?.[0] || "/placeholder-artist.jpg"
    : venue?.mediaUrls?.[0] || "/placeholder-venue.jpg";

  return (
    <Link href={href} className="w-full h-full flex flex-col">
      <div className="group relative overflow-hidden rounded-2xl border border-border/40 hover:border-primary/30 transition-all duration-300 bg-card cursor-pointer flex-1">
        {/* Image */}
        <div className="aspect-[4/2] sm:aspect-[4/3] relative overflow-hidden bg-white">
          <img
            src={imageUrl}
            alt={isArtist ? artist?.artistType || "Artist" : venue?.venueName || "Venue"}
            className="object-cover w-full object-contain h-full group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.onerror = null; // Prevent infinite loop
              e.currentTarget.style.display = 'none'; // Hide broken image
            }}
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
          {isArtist && (
            <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground px-3 py-1 rounded-md text-xs font-medium">
              {artist?.artistType}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1">
          <h4 className="subheading mb-2">
            {isArtist ? artist?.artistType : venue?.venueName}
          </h4>

          <div className="space-y-2">
            <div className="subtext flex items-center ">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{data.location}</span>
            </div>

            {isArtist && artist?.pricePerGig && (
              <div className="flex items-center subtext gap-2">
                <span>$ {artist.pricePerGig} per gig</span>
              </div>
            )}

            {!isArtist && venue?.capacity && (
              <div className="flex items-center subtext">
                <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Capacity: {venue.capacity}</span>
              </div>
            )}

            {!isArtist && venue?.venueType && (
              <div className="flex items-center subtext">
                <Music className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{venue.venueType}</span>
              </div>
            )}
          </div>

          <p className="subtext mt-3 line-clamp-2">
            {isArtist ? artist?.bio : venue?.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
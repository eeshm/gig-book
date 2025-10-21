"use client";

import Link from "next/link";
import { Artist, Venue } from "@/types";
import { MapPin, DollarSign, Users, Music } from "lucide-react";

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
    : "/placeholder-venue.jpg";

  return (
    <Link href={href}>
      <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-all hover:shadow-lg group">
        {/* Image */}
        <div className="aspect-video bg-muted relative overflow-hidden">
          <img
            src={imageUrl}
            alt={isArtist ? artist?.artistType || "Artist" : venue?.venueName || "Venue"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = isArtist ? "/placeholder-artist.jpg" : "/placeholder-venue.jpg";
            }}
          />
          {isArtist && (
            <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
              {artist?.artistType}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition">
            {isArtist ? artist?.artistType : venue?.venueName}
          </h3>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{data.location}</span>
            </div>

            {isArtist && artist?.pricePerGig && (
              <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>${artist.pricePerGig} per gig</span>
              </div>
            )}

            {!isArtist && venue?.capacity && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Capacity: {venue.capacity}</span>
              </div>
            )}

            {!isArtist && venue?.venueType && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Music className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{venue.venueType}</span>
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
            {isArtist ? artist?.bio : venue?.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
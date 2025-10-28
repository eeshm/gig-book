"use client";

import Link from "next/link";
import { Artist, Venue } from "@/types";
import { MapPin, Users, Music } from "lucide-react";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";

interface BrowseCardProps {
  type: "artist" | "venue";
  data: Artist | Venue;
}

export default function BrowseCard({ type, data }: BrowseCardProps) {
  const user = useAppSelector((state) => state.auth.user);
  const isArtist = type === "artist";
  const artist = isArtist ? (data as Artist) : null;
  const venue = !isArtist ? (data as Venue) : null;

  const href = isArtist ? `/artists/${data.id}` : `/venues/${data.id}`;
  const imageUrl = isArtist
    ? artist?.mediaUrls?.[0] || "/placeholder-artist.jpg"
    : venue?.mediaUrls?.[0] || "/placeholder-venue.jpg";

  return (
    <Link href={href} className="flex h-full w-full flex-col">
      <div className="group border-border/40 hover:border-primary/30 bg-card relative flex-1 cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-[4/2] overflow-hidden bg-white sm:aspect-[4/3]">
          <Image
            src={imageUrl}
            width={800}
            height={300}
            alt={
              isArtist ? user?.name || "Artist" : artist?.artistType || venue?.venueName || "Venue"
            }
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.onerror = null; // Prevent infinite loop
              e.currentTarget.style.display = "none"; // Hide broken image
            }}
          />
          <div className="absolute inset-0 bg-black/40 transition-all duration-300 group-hover:bg-black/20"></div>
          {isArtist && (
            <div className="bg-primary/90 text-primary-foreground absolute top-3 right-3 rounded-md px-3 py-1 text-xs font-medium">
              {artist?.artistType}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <h4 className="subheading mb-2">{isArtist ? artist?.artistType : venue?.venueName}</h4>

          <div className="space-y-2">
            <div className="subtext flex items-center">
              <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="truncate">{data.location}</span>
            </div>

            {isArtist && artist?.pricePerGig && (
              <div className="subtext flex items-center gap-2">
                <span>$ {artist.pricePerGig} per gig</span>
              </div>
            )}

            {!isArtist && venue?.capacity && (
              <div className="subtext flex items-center">
                <Users className="mr-2 h-4 w-4 flex-shrink-0" />
                <span>Capacity: {venue.capacity}</span>
              </div>
            )}

            {!isArtist && venue?.venueType && (
              <div className="subtext flex items-center">
                <Music className="mr-2 h-4 w-4 flex-shrink-0" />
                <span>{venue.venueType}</span>
              </div>
            )}
          </div>

          <p className="subtext mt-3 line-clamp-2">{isArtist ? artist?.bio : venue?.description}</p>
        </div>
      </div>
    </Link>
  );
}

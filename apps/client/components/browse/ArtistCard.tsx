import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

interface ArtistCardProps {
  id?: string;
  name: string;
  genres?: string;
  imageSrc?: string;
  location?: string;
  bio?: string;
  pricePerGig?: number;
}

const ArtistCard = ({
  id,
  name,
  genres,
  imageSrc,
  location,
  bio,
  pricePerGig,
}: ArtistCardProps) => {
  const cardContent = (
    <div
      className={`group border-border/40 hover:border-primary/30 bg-card relative overflow-hidden rounded-2xl border transition-all duration-300 ${id ? "cursor-pointer" : "cursor-default"}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-black/40 transition-all duration-300 group-hover:bg-black/20"></div>
      </div>
      <div className="p-6">
        <h4 className="mb-2 text-xl font-bold text-white">{name}</h4>
        {genres && <p className="subtext mb-4">{genres}</p>}
        {location && (
          <div className="text-muted-foreground mb-2 flex items-center text-sm">
            <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        )}

        {pricePerGig && (
          <div className="text-muted-foreground mb-2 flex items-center text-sm">
            <span>$ {pricePerGig} per gig</span>
          </div>
        )}

        {bio && <p className="text-muted-foreground line-clamp-2 text-sm">{bio}</p>}
      </div>
    </div>
  );

  if (id) {
    return <Link href={`/artists/${id}`}>{cardContent}</Link>;
  }

  return cardContent;
};

export default ArtistCard;

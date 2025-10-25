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

const ArtistCard = ({ id, name, genres, imageSrc, location, bio, pricePerGig }: ArtistCardProps) => {
  const cardContent = (
    <div className={`group relative overflow-hidden rounded-2xl border border-border/40 hover:border-primary/30 transition-all duration-300 bg-card ${id ? 'cursor-pointer' : 'cursor-default'}`}>
      <div className="aspect-[4/3] relative overflow-hidden bg-black">
      {
        imageSrc && (
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        )}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
      </div>
      <div className="p-6">
        <h4 className="text-xl font-bold text-white mb-2">{name}</h4>
        {genres && (
          <p className="subtext mb-4">{genres}</p>
        )}
        {location && (
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        )}
        
        {pricePerGig && (
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <span>$ {pricePerGig} per gig</span>
          </div>
        )}
        
        {bio && (
          <p className="text-sm text-muted-foreground line-clamp-2">{bio}</p>
        )}
      </div>
    </div>
  );

  if (id) {
    return <Link href={`/artists/${id}`}>{cardContent}</Link>;
  }

  return cardContent;
};

export default ArtistCard;

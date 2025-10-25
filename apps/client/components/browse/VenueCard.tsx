import Image from "next/image";
import Link from "next/link";

interface VenueCardProps {
  id?: string;
  name: string;
  location: string;
  capacity: number;
  imageSrc?: string;
}

const VenueCard = ({ id, name, location, capacity, imageSrc }: VenueCardProps) => {
  const cardContent = (
    <div className={`group relative overflow-hidden rounded-2xl border border-border/40 hover:border-blue-500/30 transition-all duration-300 bg-card ${id ? 'cursor-pointer' : 'cursor-default'}`}>
      <div className="aspect-[4/3] relative overflow-hidden bg-black">
        {imageSrc && (
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
        <p className="subtext mb-4">{location} · Capacity: {capacity}</p>
      </div>
    </div>
  );

  if (id) {
    return <Link href={`/venues/${id}`}>{cardContent}</Link>;
  }

  return cardContent;
};

export default VenueCard;

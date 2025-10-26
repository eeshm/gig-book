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
    <div
      className={`group border-border/40 bg-card relative overflow-hidden rounded-2xl border transition-all duration-300 hover:border-blue-500/30 ${id ? "cursor-pointer" : "cursor-default"}`}
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
        <p className="subtext mb-4">
          {location} · Capacity: {capacity}
        </p>
      </div>
    </div>
  );

  if (id) {
    return <Link href={`/venues/${id}`}>{cardContent}</Link>;
  }

  return cardContent;
};

export default VenueCard;

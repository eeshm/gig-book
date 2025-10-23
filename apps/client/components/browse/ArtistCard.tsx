import Image from "next/image";
import Link from "next/link";

interface ArtistCardProps {
  id?: string;
  name: string;
  genres?: string;
  imageSrc?: string;
}

const ArtistCard = ({ id, name, genres, imageSrc }: ArtistCardProps) => {
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
        <h4 className="text-xl font-bold text-foreground mb-2">{name}</h4>
        <p className="subtext mb-4">{genres}</p>
      </div>
    </div>
  );

  if (id) {
    return <Link href={`/artists/${id}`}>{cardContent}</Link>;
  }

  return cardContent;
};

export default ArtistCard;

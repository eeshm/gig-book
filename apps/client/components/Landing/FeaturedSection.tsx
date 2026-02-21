import Link from "next/link";
import Image from "next/image";
import FadeInView from "./FadeInView";

const ARTISTS = [
  { name: "DJ Nexus", genres: "Electronic · House · Techno", img: "/images/image1.jpg", tag: "DJ" },
  {
    name: "The Smooth Notes",
    genres: "Jazz · Blues · Soul",
    img: "/images/image2.jpg",
    tag: "Band",
  },
  {
    name: "Sarah Melody",
    genres: "Acoustic · Pop · Indie",
    img: "/images/image3.jpg",
    tag: "Solo",
  },
];

const VENUES = [
  { name: "The Grand Hall", location: "Downtown", capacity: 500, img: "/images/image4.jpg" },
  { name: "Skyline Rooftop", location: "Midtown", capacity: 200, img: "/images/image5.jpg" },
  { name: "The Underground Club", location: "East Side", capacity: 350, img: "/images/image6.jpg" },
];

const FeaturedSection = () => {
  return (
    <div className="w-full">
      {/* Section header */}
      <div className="mb-16">
        <div className="flex items-baseline gap-6">
          <h2
            className="font-family-oswald leading-none font-bold uppercase"
            style={{ fontSize: "clamp(40px,7vw,80px)" }}
          >
            Featured
          </h2>
          <div className="mb-1 flex-1 border-b border-white/8" />
          <span className="font-family-oswald text-xs tracking-[0.3em] text-white/25 uppercase">
            2026 Roster
          </span>
        </div>
        <div className="bg-primary mt-1 h-0.5 w-16" />
      </div>

      {/* Artists */}
      <div className="mb-16">
        <div className="mb-8 flex items-center gap-4">
          <div className="bg-primary h-5 w-0.5" />
          <span className="font-family-oswald text-sm tracking-[0.25em] text-white/60 uppercase">
            Top Artists
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {ARTISTS.map((a, i) => (
            <FadeInView
              key={a.name}
              delay={i * 0.08}
              className="group relative h-72 overflow-hidden border border-white/8 transition-colors duration-300 hover:border-white/20"
            >
              <Image
                src={a.img}
                fill
                alt={a.name}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              {/* Tag */}
              <div className="absolute top-3 right-3 border border-white/20 px-2 py-0.5">
                <span className="font-family-oswald text-[10px] tracking-[0.2em] text-white/60 uppercase">
                  {a.tag}
                </span>
              </div>
              {/* Info */}
              <div className="absolute right-0 bottom-0 left-0 p-5">
                <div className="font-family-oswald group-hover:text-primary text-lg font-bold text-white uppercase transition-colors duration-300">
                  {a.name}
                </div>
                <div className="font-family-manrope mt-1 text-[11px] text-white/40">{a.genres}</div>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>

      {/* Venues */}
      <div className="mb-12">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-5 w-0.5 bg-blue-500" />
          <span className="font-family-oswald text-sm tracking-[0.25em] text-white/60 uppercase">
            Premier Venues
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {VENUES.map((v, i) => (
            <FadeInView
              key={v.name}
              delay={i * 0.08}
              className="group relative h-60 overflow-hidden border border-white/8 transition-colors duration-300 hover:border-blue-500/40"
            >
              <Image
                src={v.img}
                fill
                alt={v.name}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-5">
                <div className="font-family-oswald text-lg font-bold text-white uppercase transition-colors duration-300 group-hover:text-blue-400">
                  {v.name}
                </div>
                <div className="font-family-manrope mt-1 flex items-center gap-3 text-[11px] text-white/40">
                  <span>{v.location}</span>
                  <span className="text-white/20">·</span>
                  <span>Cap. {v.capacity.toLocaleString()}</span>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col items-center gap-3 border-t border-white/8 pt-10 sm:flex-row sm:justify-center">
        <Link href="/artists">
          <button className="font-family-oswald border border-white/20 px-10 py-3.5 text-sm tracking-[0.2em] text-white/70 uppercase transition-all duration-300 hover:border-white/50 hover:text-white">
            Browse All Artists
          </button>
        </Link>
        <Link href="/venues">
          <button className="bg-primary/90 hover:bg-primary font-family-oswald px-10 py-3.5 text-sm tracking-[0.2em] text-white uppercase transition-all duration-300">
            Explore All Venues
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedSection;

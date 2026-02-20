"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

const GENRES = [
  "Electronic", "◆", "House", "◆", "Techno", "◆", "Jazz", "◆", "Blues", "◆",
  "Soul", "◆", "Acoustic", "◆", "Pop", "◆", "Indie", "◆", "Hip-Hop", "◆",
  "R&B", "◆", "Rock", "◆", "Folk", "◆", "Classical", "◆", "Ambient", "◆",
];

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marquee 28s linear infinite;
          display: flex;
          width: max-content;
        }
        @keyframes grain-move {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-2%, 3%); }
          40% { transform: translate(3%, -2%); }
          60% { transform: translate(-1%, -3%); }
          80% { transform: translate(2%, 1%); }
        }
        .grain-overlay::before {
          content: '';
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          opacity: 0.035;
          pointer-events: none;
          animation: grain-move 6s steps(1) infinite;
        }
      `}</style>

      {/* Grain overlay */}
      <div className="grain-overlay pointer-events-none absolute inset-0 z-10 overflow-hidden" />

      {/* Thin top rule */}
      <div className="mb-8 flex items-center gap-4">
        <div className="bg-primary h-px flex-1" />
        <span className="font-family-oswald text-primary text-xs tracking-[0.35em] uppercase">
          Est. 2024 — Connecting Talent &amp; Stages
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Main grid */}
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_460px]">
        {/* LEFT: Headline block */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-family-oswald font-bold uppercase leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(62px, 11vw, 148px)" }}
            >
              <span className="block text-white">Where</span>
              <span className="text-primary block">Talent</span>
              <span className="block text-white">Meets</span>
              <span
                className="block"
                style={{
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: "2px rgba(255,255,255,0.22)",
                }}
              >
                Stage.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-family-manrope max-w-sm text-[13px] leading-relaxed text-white/45"
          >
            The trusted platform connecting independent artists with venues — from underground
            clubs to rooftop bars. Book faster. Perform better.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/register?role=artist">
              <button className="bg-primary hover:bg-primary/85 font-family-oswald group relative h-14 w-full overflow-hidden px-10 text-lg tracking-[0.15em] text-white uppercase transition-all duration-300 sm:w-auto">
                <span className="relative z-10">Join as Artist</span>
                <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
              </button>
            </Link>
            <Link href="/register?role=venue">
              <button className="font-family-oswald group relative h-14 w-full border border-white/20 px-10 text-lg tracking-[0.15em] text-white/70 uppercase transition-all duration-300 hover:border-white/50 hover:text-white sm:w-auto">
                Join as Venue
              </button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-2 flex gap-10 border-t border-white/10 pt-6"
          >
            {[
              { num: "2,400+", label: "Artists" },
              { num: "800+", label: "Venues" },
              { num: "12K+", label: "Gigs Booked" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-family-oswald text-primary text-3xl font-bold leading-none">
                  {stat.num}
                </div>
                <div className="font-family-manrope mt-1 text-[10px] tracking-[0.3em] text-white/35 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: Image mosaic */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:block"
        >
          <ImageMosaic />
        </motion.div>
      </div>

      {/* Marquee ticker */}
      <div className="mt-14 overflow-hidden border-y border-white/8 py-3">
        <div className="marquee-inner">
          {[...GENRES, ...GENRES].map((g, i) => (
            <span
              key={i}
              className={`font-family-oswald mr-6 text-xs tracking-[0.25em] uppercase ${
                g === "◆" ? "text-primary" : "text-white/25"
              }`}
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImageMosaic() {
  return (
    <div className="relative h-[540px] w-full">
      {/* Corner bracket decorations */}
      <div className="absolute top-0 left-0 z-20 h-7 w-7 border-t-2 border-l-2 border-white/25" />
      <div className="absolute top-0 right-0 z-20 h-7 w-7 border-t-2 border-r-2 border-white/25" />
      <div className="absolute bottom-0 left-0 z-20 h-7 w-7 border-b-2 border-l-2 border-white/25" />
      <div className="absolute right-0 bottom-0 z-20 h-7 w-7 border-b-2 border-r-2 border-white/25" />

      {/* Top-left large image */}
      <div className="absolute top-0 left-0 h-[60%] w-[57%] overflow-hidden">
        <Image
          src="/images/image12.jpg"
          fill
          alt="Artist performing"
          className="object-cover transition-all duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Top-right image */}
      <div className="absolute top-0 right-0 h-[36%] w-[40%] overflow-hidden">
        <Image
          src="/images/image2.jpg"
          fill
          alt="Venue"
          className="object-cover transition-all duration-700 hover:scale-105"
        />
        <div className="bg-primary/20 absolute inset-0" />
      </div>

      {/* Mid-right image */}
      <div className="absolute top-[38%] right-0 h-[36%] w-[40%] overflow-hidden">
        <Image
          src="/images/image7.jpg"
          fill
          alt="Stage"
          className="object-cover transition-all duration-700 hover:scale-105"
        />
      </div>

      {/* Bottom-left image */}
      <div className="absolute bottom-0 left-0 h-[38%] w-[36%] overflow-hidden">
        <Image
          src="/images/image14.jpg"
          fill
          alt="DJ"
          className="object-cover transition-all duration-700 hover:scale-105"
        />
        <div className="bg-primary/15 absolute inset-0" />
      </div>
      {/* Bottom-right image */}
      <div className="absolute bottom-0 right-0 h-[25%] w-[61%] overflow-hidden">
        <Image
          src="/images/image6.jpg"
          fill
          alt="DJ"
          className="object-cover transition-all duration-700 hover:scale-105"
        />
        <div className="bg-primary/15 absolute inset-0" />
      </div>

      {/* Orange accent rules */}
      <div className="bg-primary absolute top-[60%] left-0 h-[2px] w-[57%]" />
      <div className="bg-primary absolute top-[36%] right-0 h-[2px] w-[40%]" />

      {/* "LIVE" badge */}
      <div className="bg-primary font-family-oswald absolute top-4 right-[42%] z-10 px-3 py-1 text-xs tracking-[0.2em] text-white uppercase">
        Live
      </div>
    </div>
  );
}

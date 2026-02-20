"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

const FEATURES = [
  {
    num: "01",
    title: "Discover Talent",
    body: "Browse a curated roster of independent artists — DJs, live bands, vocalists, and everything in between. Filter by genre, city, and budget.",
    img: "/images/image9.jpg",
    accent: true,
  },
  {
    num: "02",
    title: "Instant Booking",
    body: "Send booking requests in seconds. No back-and-forth emails — manage your entire calendar, negotiations, and confirmations from one dashboard.",
    img: "/images/image10.jpg",
    accent: false,
  },
  {
    num: "03",
    title: "Build Connections",
    body: "Every gig is a relationship. Our platform keeps artists and venues connected long after the show — building careers and filling stages.",
    img: "/images/image6.jpg",
    accent: false,
  },
];

export function WhyChooseGigBook() {
  return (
    <div className="w-full">
      {/* Section label */}
      <div className="mb-16 flex items-center gap-6">
        <div className="h-px flex-1 bg-white/10" />
        <span className="font-family-oswald text-xs tracking-[0.35em] text-white/30 uppercase">
          Why GigBook
        </span>
        <div className="bg-primary h-px flex-1" />
      </div>

      <div className="space-y-px">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative grid grid-cols-1 border border-white/6 transition-colors duration-500 hover:border-white/12 md:grid-cols-[auto_1fr_280px]"
          >
            {/* Number column */}
            <div
              className={`flex items-center justify-center px-10 py-8 md:py-10 ${
                f.accent ? "bg-primary/10" : "bg-transparent"
              }`}
            >
              <span
                className="font-family-oswald font-bold leading-none"
                style={{
                  fontSize: "clamp(48px,6vw,72px)",
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: f.accent ? "2px rgba(255,108,16,0.6)" : "2px rgba(255,255,255,0.12)",
                }}
              >
                {f.num}
              </span>
            </div>

            {/* Content column */}
            <div className="flex flex-col justify-center gap-3 border-l border-white/6 px-8 py-8 md:py-10">
              <h3 className="font-family-oswald text-foreground text-2xl font-bold uppercase tracking-wide md:text-3xl">
                {f.accent ? (
                  <>
                    <span className="text-primary">{f.title}</span>
                  </>
                ) : (
                  f.title
                )}
              </h3>
              <p className="font-family-manrope max-w-md text-[13px] leading-relaxed text-white/40">
                {f.body}
              </p>
            </div>

            {/* Image column */}
            <div className="relative hidden overflow-hidden border-l border-white/6 md:block">
              <Image
                src={f.img}
                fill
                alt={f.title}
                className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:bg-black/20" />
              {f.accent && (
                <div className="bg-primary absolute bottom-0 left-0 right-0 h-0.5" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

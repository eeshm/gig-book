"use client";

import Image from "next/image";
import { motion } from "motion/react";

const TESTIMONIALS = [
  {
    quote: "GigBook transformed my career. I've booked more gigs in 3 months than I did all last year. The venues are professional, and the platform just works.",
    name: "Marcus Chen",
    role: "DJ & Producer",
    img: "/images/image3.jpg",
    accent: true,
  },
  {
    quote: "Finding quality artists used to take weeks. Now we discover and book amazing talent in days. Our events have never been better.",
    name: "Jessica Williams",
    role: "Venue Manager",
    img: "/images/image1.jpg",
    accent: false,
  },
  {
    quote: "Coordinating with venues was always chaotic for us as a band. GigBook streamlined everything — from first contact to confirmed booking. Game changer.",
    name: "Tom Rodriguez",
    role: "Band Leader",
    img: "/images/image2.jpg",
    accent: false,
  },
];

const TestimonialSection = () => {
  return (
    <div className="w-full">
      {/* Section header */}
      <div className="mb-16">
        <div className="flex items-baseline gap-6">
          <h2
            className="font-family-oswald font-bold uppercase leading-none"
            style={{ fontSize: "clamp(40px,7vw,80px)" }}
          >
            Voices
          </h2>
          <div className="mb-1 flex-1 border-b border-white/8" />
          <span className="font-family-oswald text-xs tracking-[0.3em] text-white/25 uppercase">
            From the Community
          </span>
        </div>
        <div className="bg-primary mt-1 h-0.5 w-16" />
      </div>

      <div className="grid gap-px border border-white/6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative flex flex-col justify-between border border-white/6 p-8 transition-colors duration-500 hover:bg-white/2"
          >
            {/* Large decorative quote mark */}
            <div
              className="font-family-oswald absolute top-3 right-5 select-none text-[72px] font-black leading-none"
              style={{
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: t.accent ? "1px rgba(255,108,16,0.2)" : "1px rgba(255,255,255,0.06)",
              }}
            >
              &ldquo;
            </div>

            {/* Quote text */}
            <p className="font-family-manrope relative z-10 mb-8 text-[13px] leading-[1.75] text-white/55 italic">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Attribution */}
            <div className="flex items-center gap-4">
              <div className="relative h-10 w-10 overflow-hidden border border-white/15">
                <Image src={t.img} fill alt={t.name} className="object-cover" />
              </div>
              <div>
                <div className={`font-family-oswald text-sm font-bold uppercase tracking-wide ${
                  t.accent ? "text-primary" : "text-white/80"
                }`}>
                  {t.name}
                </div>
                <div className="font-family-manrope text-[10px] tracking-[0.2em] text-white/30 uppercase">
                  {t.role}
                </div>
              </div>
            </div>

            {t.accent && (
              <div className="bg-primary absolute bottom-0 left-0 right-0 h-0.5" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;

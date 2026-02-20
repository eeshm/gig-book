"use client";

import GridSection from "@/components/Landing/ImageGrid";
import Footer from "@/components/layout/Footer";
import FeaturedSection from "@/components/Landing/FeaturedSection";
import HowItWorks from "@/components/Landing/HowItWorks";
import TestimonialSection from "@/components/Landing/TestimonialSection";
import { WhyChooseGigBook } from "@/components/Landing/WhyChooseGigBook";
import HeroSection from "@/components/Landing/HeroSection";

export default function HomePage() {
  return (
    <>
      <div className="relative mx-auto flex max-w-[88rem] flex-col px-4 sm:px-8 lg:px-10">
        {/* Hero */}
        <section id="hero" className="w-full pt-10 pb-4">
          <HeroSection />
        </section>

        {/* Why GigBook */}
        <section id="why-choose" className="w-full py-24">
          <WhyChooseGigBook />
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-24">
          <GridSection />
        </section>

        {/* Featured */}
        <section id="featured" className="w-full py-24">
          <FeaturedSection />
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24">
          <div className="border border-white/6 bg-[rgb(10,10,10)]">
            <HowItWorks />
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="w-full py-24">
          <TestimonialSection />
        </section>
      </div>

      {/* Bottom wordmark */}
      <div className="relative overflow-hidden border-t border-white/6 py-16">
        <div
          className="font-family-oswald select-none text-center font-bold leading-none uppercase"
          style={{
            fontSize: "min(24vw, 500px)",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "1px rgba(255,108,16,0.18)",
          }}
        >
          GigBook
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
      </div>

      <Footer />
    </>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Grid from "@/components/Landing/ImageGrid";
import Footer from "@/components/layout/Footer";
import FeaturedSection from "@/components/Landing/FeaturedSection";
import HowItWorks from "@/components/Landing/HowItWorks";
import TestimonialSection from "@/components/Landing/TestimonialSection";
import { WhyChooseGigBook } from "@/components/Landing/WhyChooseGigBook";
import Image from "next/image";
import { cn } from "@/lib/utils";
import HeroSection from "@/components/Landing/HeroSection";

export default function HomePage() {
  return (
    <>
      <div className="bg-background flex flex-col mt-15 max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        {/* Hero Section */}
        <HeroSection />

        <section className="py-24 w-full flex justify-center">
          <WhyChooseGigBook />
        </section>


        <section className="py-24">
          <Grid />
        </section>

        {/* Featured Artists & Venues Section */}
        <section className="py-24 w-full">
          <FeaturedSection />
        </section>

        {/* Testimonials Section */}
        <section className="py-24 w-full">
          <TestimonialSection />
        </section>

        {/* How It Works Section */}
        <section className="py-24">
          <div className="py-2 px-0 w-full dotted-background bg-[rgb(22,22,22)] rounded-2xl mb-10">
            <HowItWorks />
          </div>
        </section>
      </div>

      <div style={{ fontSize: "min(27vw, 510px)", backgroundImage: "linear-gradient(to bottom, rgb(255,108,16), transparent)" }} className="font-semibold text-[rgb(255,108,16)] my-10 md:mb-20 font-family-oswald uppercase text-nowrap text-center leading-[0.7] select-none bg-clip-text">
        GigBook
      </div>
      <Footer />
    </>
  );
}

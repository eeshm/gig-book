import HeroSection from "@/components/Landing/HeroSection";
import { WhyChooseGigBook } from "@/components/Landing/WhyChooseGigBook";
import FeaturedSection from "@/components/Landing/FeaturedSection";
import HowItWorks from "@/components/Landing/HowItWorks";
import TestimonialSection from "@/components/Landing/TestimonialSection";
import Footer from "@/components/layout/Footer";
// GridSection uses scroll hooks — wrapped in a Client Component with ssr:false
import GridSection from "@/components/Landing/GridSectionClient";

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
          className="font-family-oswald text-center leading-none font-bold uppercase select-none"
          style={{
            fontSize: "min(24vw, 500px)",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "1px rgba(255,108,16,0.18)",
          }}
        >
          GigBook
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      </div>

      <Footer />
    </>
  );
}

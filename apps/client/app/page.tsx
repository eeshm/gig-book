import Grid from "@/components/Landing/ImageGrid";
import Footer from "@/components/layout/Footer";
import FeaturedSection from "@/components/Landing/FeaturedSection";
import HowItWorks from "@/components/Landing/HowItWorks";
import TestimonialSection from "@/components/Landing/TestimonialSection";
import { WhyChooseGigBook } from "@/components/Landing/WhyChooseGigBook";
import HeroSection from "@/components/Landing/HeroSection";

export default function HomePage() {
  return (
    <>
      {/* Add two lines add borders one at extreme right and one at left */}
      <div className="bg-background relative mx-auto mt-15 flex max-w-7xl flex-col px-2 sm:px-6 lg:px-4">
        {/* <div className="border-r border-l border-b px-2"> */}
        {/* Hero Section */}
        <section id="hero" className="w-full pt-14 pb-8">
          <HeroSection />
        </section>

        {/* <div className="w-full h-px bg-gray-700 my-2 -ml-2"></div>
          <div className="w-full h-px bg-gray-700 my-2 -mx-2"></div>
           */}
        <section id="why-choose" className="flex w-full justify-center py-24">
          <WhyChooseGigBook />
        </section>

        {/* Image Gallery Section */}
        <section id="gallery" className="py-24">
          <Grid />
        </section>

        {/* Featured Artists & Venues Section */}
        <section id="featured" className="w-full py-24">
          <FeaturedSection />
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24">
          <div className="dotted-background mb-10 w-full rounded-2xl bg-[rgb(22,22,22)] px-0 py-2">
            <HowItWorks />
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-24">
          <TestimonialSection />
        </section>

        {/* </div> */}
      </div>

      <div
        style={{
          fontSize: "min(27vw, 510px)",
          backgroundImage: "linear-gradient(to bottom, rgb(255,108,16), transparent)",
        }}
        className="font-family-oswald my-10 bg-clip-text text-center leading-[0.7] font-semibold text-nowrap text-[rgb(255,108,16)] uppercase select-none md:mb-20"
      >
        GigBook
      </div>
      <Footer />
    </>
  );
}

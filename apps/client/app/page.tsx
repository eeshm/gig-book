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
      <div className="bg-background relative flex flex-col mt-15 max-w-7xl mx-auto px-2 sm:px-6 lg:px-4">
        {/* <div className="border-r border-l border-b px-2"> */}
          {/* Hero Section */}
          <section id="hero" className="pt-14 w-full pb-8">
            <HeroSection />
          </section>

          {/* <div className="w-full h-px bg-gray-700 my-2 -ml-2"></div>
          <div className="w-full h-px bg-gray-700 my-2 -mx-2"></div>
           */}
          <section id="why-choose" className="py-24 w-full flex justify-center">
            <WhyChooseGigBook />
          </section>

          {/* Image Gallery Section */}
          <section id="gallery" className="py-24">
            <Grid />
          </section>

          {/* Featured Artists & Venues Section */}
          <section id="featured" className="py-24 w-full">
            <FeaturedSection />
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="py-24">
            <div className="py-2 px-0 w-full dotted-background bg-[rgb(22,22,22)] rounded-2xl mb-10">
              <HowItWorks />
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-24 w-full">
            <TestimonialSection />
          </section>

        {/* </div> */}
      </div>

      <div style={{ fontSize: "min(27vw, 510px)", backgroundImage: "linear-gradient(to bottom, rgb(255,108,16), transparent)" }} className="font-semibold text-[rgb(255,108,16)] my-10 md:mb-20 font-family-oswald uppercase text-nowrap text-center leading-[0.7] select-none bg-clip-text">
        GigBook
      </div>
      <Footer />
    </>
  );
}

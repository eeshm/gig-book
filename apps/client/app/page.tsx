import Link from "next/link";
import { Button } from "@/components/ui/button";
import Grid from "@/components/Landing/ImageGrid";
import Footer from "@/components/layout/Footer";
import FeaturedSection from "@/components/Landing/FeaturedSection";
import HowItWorks from "@/components/Landing/HowItWorks";
import TestimonialSection from "@/components/Landing/TestimonialSection";
import {WhyChooseGigBook} from "@/components/Landing/WhyChooseGigBook";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
    <div className="bg-background flex flex-col mt-15 max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
      {/* Hero Section */}
    <section className="w-full flex justify-center">
      <div className="">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left Content */}
          <div className="flex flex-col gap-8 relative">
            <div className="absolute inset-x-20 inset-y-20 opacity-60">
              <svg className="w-full h-full" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 40 10 L 10 10 10 40" fill="none" stroke="currentColor" strokeWidth="2px" />
                  </pattern>
                </defs>
                <rect width="400" height="400" fill="url(#grid)" />
              </svg>
            </div>
            <div className="space-y-4 relative z-10">
                <h1 className="heading">
                  Where Talent Meets <span className="text-primary">Opportunity</span>
                </h1>
              <p className=" max-w-lg text-[13px] text-foreground/80 font-family-manrope leading-relaxed">
                We are the trusted partner for artists and venues, offering innovative solutions that turn your ideas
                into impactful realities.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-5 pt-4 relative z-10 font-family-oswald ">
              <Link href="/register?role=artist">
              <Button className="items-center justify-center transition-all duration-150  w-full lg:w-auto h-12 px-8 text-xl lg:h-16 lg:px-10 lg:text-xl bg-primary text-white">
              I am an Artist
              </Button>
              </Link>
              <Link href="/register?role=venue">
              <Button variant="outline" className="items-center justify-center transition-all duration-150 hover:bg-primary/90 w-full lg:w-auto h-14 px-8 text-xl lg:h-16 lg:px-10 lg:text-xl relative overflow-hidden">
              {/* <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(circle, currentColor 10px, transparent 10px)', backgroundSize: '12px 12px'}}></div> */}
              <span className="relative z-10">I am a Venue</span>
              </Button>
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 lg:h-full min-h-96 mt-0">
            <div className="absolute inset-0 overflow-hidden flex items-center justify-center shadow-2xl">
              <Image
                src="/images/image9.jpg"
                width={800}
                height={600}
                alt="Landing Visual"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

      <section className="py-24 w-full flex justify-center">
        <WhyChooseGigBook/>
      </section>


      <section className="py-24">
          <Grid />
      </section>

      {/* Featured Artists & Venues Section */}
      <section className="py-24 w-full">
        <FeaturedSection/>
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

        <div style={{ fontSize: "min(27vw, 510px)" }} className="font-semibold text-center text-[rgb(255,108,16)] my-10 md:mb-20 font-family-oswald uppercase text-nowrap text-center leading-[0.7] select-none">
          GigBook
        </div>
    <Footer />
    </>
  );
}

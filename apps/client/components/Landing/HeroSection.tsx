"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { CursorHeroSection } from "./CursorHeroSection";

export default function HeroSection() {
  return (
    <>
      <section className="flex w-full justify-center">
        <div className="">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
            {/* Left Content */}
            <div className="relative flex flex-col gap-8">
              {/* White Dots Background */}
              <div className="absolute top-0 right-5 bottom-60 left-5 opacity-30 sm:top-0 sm:right-40 sm:bottom-60 sm:left-5">
                <div
                  className="w-ful h-full"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, var(--color-gray-300) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                />
              </div>
              <div className="relative z-10 space-y-4">
                <h1
                  className={cn(
                    "font-family-oswald text-5xl font-bold sm:text-7xl",
                    "leading-tight tracking-tight text-balance",
                    "text-white"
                  )}
                >
                  Where Talent Meets <span className="text-primary">Opportunity</span>
                </h1>
                <p className="font-family-manrope max-w-lg pt-5 md:pt-0 text-[14px] leading-relaxed text-white/70">
                  We are the trusted partner for artists and venues, offering innovative solutions
                  that turn your ideas into impactful realities.
                </p>
              </div>

              <div className="font-family-oswald relative z-10 flex flex-col gap-4 pt-4 sm:flex-row sm:gap-5">
                <Link href="/register?role=artist">
                  <button className="bg-primary h-12 w-full text-white items-center justify-center px-8 text-xl transition-all duration-150 lg:h-16 lg:w-auto lg:px-10 lg:text-xl">
                    I am an Artist
                  </button>
                </Link>
                <Link href="/register?role=venue">
                  <button className="relative h-12 w-full items-center justify-center overflow-hidden bg-black px-8 text-xl transition-all duration-150 hover:opacity-80 lg:h-16 lg:w-auto lg:px-10 lg:text-xl">
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, currentColor 10px, transparent 10px)",
                        backgroundSize: "12px 12px",
                      }}
                    ></div>
                    <span className="relative z-10 text-white">I am a Venue</span>
                  </button>
                </Link>
              </div>
              <CursorHeroSection />
            </div>

            {/* Right Visual */}
            <div className="relative mt-0 h-96 min-h-96 lg:h-full">
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden shadow-2xl">
                <ImageBentoBox />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const ImageBentoBox = () => {
  const images = [
    { src: "/images/image12.jpg", alt: "Image 1" },
    { src: "/images/image2.jpg", alt: "Image 2" },
    { src: "/images/image3.jpg", alt: "Image 3" },
    { src: "/images/image7.jpg", alt: "Image 4" },
    { src: "/images/image5.jpg", alt: "Image 5" },
    { src: "/images/image3.jpg", alt: "Image 6" },
    { src: "/images/image14.jpg", alt: "Image 7" },
    { src: "/images/image17.jpg", alt: "Image 8" },
  ];

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="relative grid h-full w-full gap-2 md:grid-cols-8 md:gap-4">
      {/* Large background text */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div className="flex gap-0 md:gap-4">
          {!isDesktop ? (
            <div className="flex flex-col gap-1">
              {Array.from("GIGBOOK").map((char, idx) => (
                <h1
                  key={idx}
                  className="font-family-oswald text-center text-5xl leading-none font-black drop-shadow-lg"
                  style={
                    {
                      background: "linear-gradient(135deg, #ffffff 0%, #9ca3af 50%, #000000 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 0 20px rgba(0, 0, 0, 0.5))",
                    } as React.CSSProperties
                  }
                >
                  {char}
                </h1>
              ))}
            </div>
          ) : (
            <h1
              className="font-family-oswald text-center text-9xl leading-none font-black drop-shadow-2xl"
              style={
                {
                  background: "linear-gradient(135deg, #ffffff 0%, #9ca3af 50%, #1f2937 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 30px rgba(0, 0, 0, 0.6))",
                  letterSpacing: "-0.05em",
                } as React.CSSProperties
              }
            >
              GIGBOOK
            </h1>
          )}
        </div>
      </div>

      {images.map((image, index) => (
        <ImageCard
          key={index}
          image={image}
          index={index}
          totalImages={images.length}
          scrollProgress={scrollYProgress}
        />
      ))}
    </div>
  );
};

const ImageCard = ({
  image,
  index,
  totalImages,
  scrollProgress,
}: {
  image: { src: string; alt: string };
  index: number;
  totalImages: number;
  scrollProgress: any;
}) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop: animation starts at 70% scroll, Mobile: starts at 30%
  const animationStart = isDesktop ? 0.6 : 0.3;
  const animationRange = isDesktop ? 0.28 : 0.68; // remaining range for animations

  const startDisappear = animationStart + (index / totalImages) * animationRange;
  const endDisappear = animationStart + ((index + 1) / totalImages) * animationRange;

  const opacity = useTransform(scrollProgress, [0, startDisappear, endDisappear, 1], [1, 1, 0, 0]);

  const x = useTransform(scrollProgress, [0, startDisappear, endDisappear, 1], [0, 0, 500, 500]);

  return (
    <motion.div
      className="group relative col-span-4 row-span-1 overflow-hidden rounded-xl transition-all duration-500 hover:shadow-2xl md:col-span-1 md:row-span-4"
      style={{
        opacity,
        x,
      }}
    >
      <Image
        src={image.src}
        width={200}
        height={200}
        alt={image.alt}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
    </motion.div>
  );
};

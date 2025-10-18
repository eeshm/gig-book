// apps/frontend/app/page.tsx
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Navbar />

      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
          poster="/placeholder-poster.jpg" // Optional: Poster image for faster initial load
        >
          {/* Replace with your actual video file */}
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <main className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4">
          {/* Left Section: Text and CTAs */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter">
              Where Gigs Find Their Stage.
            </h1>
            <p className="max-w-md text-lg text-gray-300">
              The seamless connection between talented artists and premier venues. Your next unforgettable event starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg py-7 px-8 w-full">
                <Link href="/register?role=ARTIST">I am an Artist</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="bg-gray-800 hover:bg-gray-700 text-lg py-7 px-8 w-full">
                <Link href="/register?role=VENUE">I am a Venue</Link>
              </Button>
            </div>
          </div>
          
          {/* Right Section: Deliberately empty for the video background to show through */}
          <div className="hidden md:block">
            {/* This space is visually filled by the video on the right side of the screen */}
          </div>
        </div>
      </main>
    </div>
  );
}
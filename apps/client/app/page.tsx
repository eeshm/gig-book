import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Music, Calendar, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full bg-background flex flex-col mt-15">
      {/* Hero Section */}
    <section className="w-full flex justify-center px-4 sm:px-6 lg:px-4">
      <div className="max-w-7xl w-full">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left Content */}
          <div className="flex flex-col gap-8 ">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center mb-4">
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground text-balance leading-tight">
            Connect Artists with <span className="text-primary">Perfect Venues</span>
                </h1>
              </div>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg font-medium">
                We are the trusted partner for artists and venues, offering innovative solutions that turn your ideas
                into impactful realities.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-5 pt-4">
              <Link href="/register?role=artist">
              <Button className="items-center justify-center transition-all duration-150 group-hover:-translate-x-2 group-hover:-translate-y-2 w-full lg:w-auto h-14 px-8 text-xl lg:h-16 lg:px-10 lg:text-xl bg-primary text-white">
              I am an Artist
              </Button>
              </Link>
              <Link href="/register?role=venue">
              <Button className="items-center bg-black justify-center border border-gray-400 transition-all duration-150 group-hover:-translate-x-2 group-hover:-translate-y-2 w-full lg:w-auto h-14 px-8 text-xl lg:h-16 lg:px-10 lg:text-xl">
              I am a Venue
              </Button>
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 lg:h-full min-h-96 mt-10">
            <div className="absolute inset-0 bg-primary rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl">
              {/* Grid pattern background */}
              <div className="absolute inset-0 opacity-25">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1.5" />
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="url(#grid)" />
                </svg>
              </div>

              {/* Geometric shapes */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="flex gap-8">
                  <div className="w-28 h-28 bg-white rounded-full shadow-lg"></div>
                  <div className="w-36 h-36 bg-white rounded-full shadow-lg"></div>
                  <div className="w-24 h-24 bg-white rounded-full shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Features Section */}
      <section className="py-32 w-full flex justify-center px-4 sm:px-6 lg:px-4 bg-card">
        <div className="max-w-7xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-20">
            Why Choose GigBook?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center flex justify-center flex-col items-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Music className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Discover Talent</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Browse through a diverse collection of talented artists, from DJs to live performers.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center flex justify-center flex-col items-center">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center mb-6">
                <Calendar className="w-10 h-10 text-secondary bg-black" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Easy Booking</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Send booking requests with just a few clicks and manage everything in one place.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center flex justify-center flex-col items-center ">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center mb-6">
                <Users className="w-10 h-10 text-accent bg-black" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Build Connections</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Connect venues with artists to create memorable events and lasting partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 w-full flex justify-center px-4 sm:px-6 lg:px-4">
        <div className="max-w-7xl w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Ready to Get Started?</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
            Join thousands of artists and venues already using GigBook.
          </p>
          <Link href="/register">
            <Button size="lg" className="text-base px-10 py-6">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

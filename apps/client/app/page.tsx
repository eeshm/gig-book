'use client';
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Music, MapPin, User, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <main className="bg-[#000000]">
      <div className="mx-auto flex min-h-screen flex-col items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {/* Hero Section */}
          <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Connect Artists with Venues
              </h1>
              <p className="mb-8 text-xl text-slate-300">
                Book amazing performances for your venue or showcase your talent to event organizers.
              </p>

              {!user ? (
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link href="/register?role=artist">
                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 sm:w-auto">
                      <Music className="mr-2 h-5 w-5" />
                      Continue as Artist
                    </Button>
                  </Link>
                  <Link href="/register?role=venue">
                    <Button size="lg" variant="outline" className="w-full border-blue-400 text-blue-400 hover:bg-blue-950 sm:w-auto">
                      <MapPin className="mr-2 h-5 w-5" />
                      Continue as Venue
                    </Button>
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="mb-4 text-lg text-slate-300">Welcome back, {user.name}!</p>
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700">
                      Go to Dashboard
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Features Section */}
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-12 text-center text-3xl font-bold text-white">How It Works</h2>
              <div className="grid gap-8 md:grid-cols-3">
                {/* Feature 1 */}
                <div className="rounded-lg bg-slate-800/50 p-6">
                  <User className="mb-4 h-12 w-12 text-blue-500" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Create Your Profile</h3>
                  <p className="text-slate-300">
                    Set up your profile as an artist or venue, add details, and showcase your work.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="rounded-lg bg-slate-800/50 p-6">
                  <Zap className="mb-4 h-12 w-12 text-yellow-500" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Book & Connect</h3>
                  <p className="text-slate-300">
                    Venues book artists, artists accept or reject gigs. Simple, straightforward booking.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="rounded-lg bg-slate-800/50 p-6">
                  <Music className="mb-4 h-12 w-12 text-purple-500" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Grow Your Network</h3>
                  <p className="text-slate-300">
                    Build relationships, manage your gigs, and grow your portfolio over time.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl rounded-lg bg-blue-600/10 p-8 text-center">
              <h2 className="mb-4 text-2xl font-bold text-white">Ready to Get Started?</h2>
              <p className="mb-6 text-slate-300">Join thousands of artists and venues on our platform.</p>
              {!user ? (
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link href="/register?role=artist">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 sm:w-auto">
                      Sign Up as Artist
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" className="w-full border-slate-400 hover:bg-slate-800 sm:w-auto">
                      Log In
                    </Button>
                  </Link>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}


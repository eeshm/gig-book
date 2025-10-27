import Link from "next/link";
import { Button } from "@/components/ui/button";
import {MoveRight } from "lucide-react";
const HowItWorks = () => {
  return (
    <div className="w-full p-4">
      <div className="mb-20 text-center">
        <h2 className="heading mb-4">How It Works</h2>
        <div className="from-primary via-primary mx-auto h-1 w-24 bg-gradient-to-r to-transparent"></div>
      </div>

      <div className="mx-auto grid max-w-sm gap-8 sm:max-w-md md:max-w-3xl md:grid-cols-2 lg:gap-12">
        {/* For Artists */}
        <div className="flex flex-col space-y-8 rounded-lg bg-black p-8">
          <div className="flex-1">
            <div className="mb-8 flex items-center gap-4">
              <h3 className="subheading">For Artists</h3>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <MoveRight width={12} className="text-primary" />
                <div>
                  <h4 className="mb-1 font-semibold">Create Your Profile</h4>
                  <p className="subtext">
                    Showcase your talent with photos, videos, and performance history.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <MoveRight width={12} className="text-primary" />
                <div>
                  <h4 className="mb-1 font-semibold">Add Your Skills</h4>
                  <p className="subtext">Highlight your genres, experience level, and equipment.</p>
                </div>
              </div>

              <div className="flex gap-2">
                <MoveRight width={12} className="text-primary" />
                <div>
                  <h4 className="mb-1 font-semibold">Get Discovered</h4>
                  <p className="subtext">
                    Venues browse and reach out to artists that match their event needs.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <MoveRight width={12} className="text-primary" />
                <div>
                  <h4 className="mb-1 font-semibold">Receive Offers</h4>
                  <p className="subtext">
                    Get booking requests from venues looking for your specific talent.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <MoveRight width={12} className="text-primary" />
                <div>
                  <h4 className="mb-1 font-semibold">Manage Bookings</h4>
                  <p className="subtext text-gray-300">
                    Accept requests, coordinate details, and grow your performance career.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Link href="/register?role=artist">
            <Button size="default" className="bg-foreground mt-0 w-full rounded-xl text-black">
              Join as Artist
            </Button>
          </Link>
        </div>

        {/* For Venues */}
        <div className="flex flex-col space-y-8 rounded-lg bg-[rgb(255,108,16)] p-8">
          <div className="flex-1">
            <div className="mb-8 flex items-center gap-4">
              <h3 className="subheadingblack">For Venues</h3>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <MoveRight width={12} className="text-black" />
                <div>
                  <h4 className="mb-1 font-semibold text-black">List Your Venue</h4>
                  <p className="text-xs text-black/60">
                    Add details about your space, capacity, and event types you host.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <MoveRight width={12} className="text-black" />
                <div>
                  <h4 className="mb-1 font-semibold text-black">Set Your Requirements</h4>
                  <p className="text-xs text-black/60">
                    Define your budget, preferred genres, and technical needs.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <MoveRight width={12} className="text-black" />
                <div>
                  <h4 className="mb-1 font-semibold text-black">Browse Artists</h4>
                  <p className="text-xs text-black/60">
                    Search through talented performers and find the perfect match.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <MoveRight width={12} className="text-black" />
                <div>
                  <h4 className="mb-1 font-semibold text-black">Send Requests</h4>
                  <p className="text-xs text-black/60">
                    Reach out to artists with your event details and requirements.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <MoveRight width={12} className="text-black" />
                <div>
                  <h4 className="mb-1 font-semibold text-black">Book & Host</h4>
                  <p className="text-xs text-black/60">
                    Send booking requests and create unforgettable events together.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Link href="/register?role=venue">
            <Button size="lg" className="mt-0 w-full rounded-xl bg-black text-[rgb(255,108,16)]">
              Join as Venue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

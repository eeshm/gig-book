import Link from "next/link";
import FadeInView from "./FadeInView";

const ARTIST_STEPS = [
  {
    n: "1",
    title: "Create Profile",
    body: "Showcase your talent with photos, videos, and performance history.",
  },
  {
    n: "2",
    title: "Add Your Skills",
    body: "Highlight genres, experience level, and your equipment setup.",
  },
  {
    n: "3",
    title: "Get Discovered",
    body: "Venues browse and reach out to artists that match their needs.",
  },
  {
    n: "4",
    title: "Receive Offers",
    body: "Get booking requests from venues looking for your talent.",
  },
  {
    n: "5",
    title: "Manage Bookings",
    body: "Accept, coordinate, and grow your performance career.",
  },
];

const VENUE_STEPS = [
  { n: "1", title: "List Your Venue", body: "Add your space details, capacity, and event types." },
  {
    n: "2",
    title: "Set Requirements",
    body: "Define your budget, preferred genres, and technical needs.",
  },
  {
    n: "3",
    title: "Browse Artists",
    body: "Search talented performers and find your perfect match.",
  },
  {
    n: "4",
    title: "Send Requests",
    body: "Reach out to artists with your event details directly.",
  },
  {
    n: "5",
    title: "Book & Host",
    body: "Confirm bookings and create unforgettable events together.",
  },
];

const HowItWorks = () => {
  return (
    <div className="w-full px-4 py-12">
      {/* Section header */}
      <div className="mb-14 flex items-baseline gap-6">
        <h2
          className="font-family-oswald leading-none font-bold uppercase"
          style={{ fontSize: "clamp(40px,7vw,80px)" }}
        >
          How It Works
        </h2>
        <div className="mb-1 flex-1 border-b border-white/10" />
      </div>

      {/* Two-column program layout */}
      <div className="grid gap-0 md:grid-cols-2">
        {/* ARTISTS column */}
        <div className="border-b border-white/8 md:border-r md:border-b-0">
          <div className="border-b border-white/8 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary h-4 w-0.5" />
              <span className="font-family-oswald text-primary text-xs tracking-[0.3em] uppercase">
                For Artists
              </span>
            </div>
          </div>
          <div className="space-y-0">
            {ARTIST_STEPS.map((step, i) => (
              <FadeInView
                key={step.n}
                direction="left"
                delay={i * 0.06}
                className="group flex gap-0 border-b border-white/5 last:border-0"
              >
                <div className="flex w-14 items-start justify-center border-r border-white/5 pt-5 pb-5">
                  <span className="font-family-oswald text-primary text-xl font-bold">
                    {step.n}
                  </span>
                </div>
                <div className="flex-1 px-6 py-5">
                  <div className="font-family-oswald mb-1 text-sm font-bold tracking-wide text-white uppercase">
                    {step.title}
                  </div>
                  <p className="font-family-manrope text-[12px] leading-relaxed text-white/35">
                    {step.body}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
          <div className="border-t border-white/8 px-6 py-5">
            <Link href="/register?role=artist">
              <button className="bg-primary hover:bg-primary/85 font-family-oswald w-full py-3.5 text-sm tracking-[0.2em] text-white uppercase transition-colors duration-300">
                Join as Artist
              </button>
            </Link>
          </div>
        </div>

        {/* VENUES column */}
        <div>
          <div className="border-b border-white/8 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="h-4 w-0.5 bg-white/30" />
              <span className="font-family-oswald text-xs tracking-[0.3em] text-white/50 uppercase">
                For Venues
              </span>
            </div>
          </div>
          <div className="space-y-0">
            {VENUE_STEPS.map((step, i) => (
              <FadeInView
                key={step.n}
                direction="right"
                delay={i * 0.06}
                className="group flex gap-0 border-b border-white/5 last:border-0"
              >
                <div className="flex w-14 items-start justify-center border-r border-white/5 pt-5 pb-5">
                  <span className="font-family-oswald text-xl font-bold text-white/25">
                    {step.n}
                  </span>
                </div>
                <div className="flex-1 px-6 py-5">
                  <div className="font-family-oswald mb-1 text-sm font-bold tracking-wide text-white uppercase">
                    {step.title}
                  </div>
                  <p className="font-family-manrope text-[12px] leading-relaxed text-white/35">
                    {step.body}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
          <div className="border-t border-white/8 px-6 py-5">
            <Link href="/register?role=venue">
              <button className="font-family-oswald w-full border border-white/20 py-3.5 text-sm tracking-[0.2em] text-white/70 uppercase transition-all duration-300 hover:border-white/50 hover:text-white">
                Join as Venue
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

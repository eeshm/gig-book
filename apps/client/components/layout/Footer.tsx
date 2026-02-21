import Link from "next/link";
import { Github } from "lucide-react";
import TwitterIcon from "../ui/TwitterIcon";

const NAV_LINKS = [
  { href: "/artists", label: "Browse Artists" },
  { href: "/venues", label: "Browse Venues" },
  { href: "/#why-choose", label: "Why GigBook" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/login", label: "Sign In" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#060605]">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-8 lg:px-10">
        {/* Main row */}
        <div className="grid gap-12 py-14 md:grid-cols-[1fr_auto_auto] md:gap-20">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="bg-primary h-5 w-0.5" />
              <span className="font-family-oswald text-2xl font-bold tracking-[0.1em] text-white uppercase">
                GigBook
              </span>
            </div>
            <p className="font-family-manrope max-w-xs text-[12px] leading-relaxed text-white/30">
              The trusted marketplace connecting independent artists with venues — from underground
              clubs to rooftop stages.
            </p>
            <div className="flex items-center gap-1">
              <a
                href="https://x.com/eeshmidha1"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center border border-white/10 text-white/35 transition-colors hover:border-white/30 hover:text-white"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://github.com/eeshm"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center border border-white/10 text-white/35 transition-colors hover:border-white/30 hover:text-white"
              >
                <Github className="size-6 stroke-white" />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <div className="font-family-oswald mb-4 text-[10px] tracking-[0.35em] text-white/20 uppercase">
              Platform
            </div>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-family-oswald text-xs tracking-[0.2em] text-white/40 uppercase transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA block */}
          <div className="flex flex-col gap-3 self-start">
            <div className="font-family-oswald mb-1 text-[10px] tracking-[0.35em] text-white/20 uppercase">
              Get Started
            </div>
            <Link href="/register?role=artist">
              <button className="bg-primary hover:bg-primary/85 font-family-oswald w-full px-8 py-3 text-xs tracking-[0.2em] text-white uppercase transition-colors">
                Join as Artist
              </button>
            </Link>
            <Link href="/register?role=venue">
              <button className="font-family-oswald w-full border border-white/15 px-8 py-3 text-xs tracking-[0.2em] text-white/55 uppercase transition-all hover:border-white/35 hover:text-white">
                Join as Venue
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/6 py-5 sm:flex-row">
          <span className="font-family-manrope text-[10px] tracking-[0.15em] text-white/20">
            &copy; {new Date().getFullYear()} GigBook. All rights reserved.
          </span>
          <div className="flex items-center gap-1">
            <div className="bg-primary h-px w-8" />
            <span className="font-family-oswald text-[9px] tracking-[0.4em] text-white/15 uppercase">
              Est. 2024
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

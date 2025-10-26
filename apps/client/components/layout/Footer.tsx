import Link from "next/link";
import { Twitter, Instagram, Facebook, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-border bg-foreground text-background border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 text-center md:flex-row md:justify-between md:text-start">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="font-family-oswald text-3xl font-bold tracking-wide">GigBook</h3>
            <p className="subtext text-sm leading-relaxed italic">
              Connecting artists with perfect venues to create unforgettable events and lasting
              partnerships.
            </p>
            <div className="flex justify-center gap-0 md:justify-start">
              {/* Social Media Icons */}
              <a
                href="https://x.com/eeshmidha1"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
              >
                <Twitter className="h-5 w-5 stroke-2" />
              </a>
              <a
                href="https://github.com/eeshm"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
              >
                <Github className="h-5 w-5 stroke-2" />
              </a>
            </div>
          </div>

          <div className="font-family-oswald flex justify-center md:justify-end">
            <ul className="space-y-3">
              <li>
                <Link href="/#hero">About us</Link>
              </li>
              <li>
                <Link href="/#why-choose">Why Choose Us</Link>
              </li>
              <li>
                <Link href="/#how-it-works">How It Works</Link>
              </li>
              <li>
                <Link href="/artists">Browse Artists</Link>
              </li>
              <li>
                <Link href="/venues">Browse Venues</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Twitter, Instagram, Facebook, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 text-center md:text-start">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold  font-family-oswald tracking-wide">GigBook</h3>
            <p className="text-sm leading-relaxed italic subtext">
              Connecting artists with perfect venues to create unforgettable events and lasting partnerships.
            </p>
            <div className="flex gap-0 justify-center md:justify-start">
              {/* Social Media Icons */}
              <a href="https://x.com/eeshmidha1" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5 stroke-2" />
              </a>
              <a href="https://github.com/eeshm" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <Github className="w-5 h-5 stroke-2" />
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end font-family-oswald ">
            <ul className="space-y-3">
              <li>
                <Link href="/#hero">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/#why-choose">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" >
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/artists">
                  Browse Artists
                </Link>
              </li>
              <li>
                <Link href="/venues">
                  Browse Venues
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

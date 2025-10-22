import Link from "next/link";
import { Twitter, Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground">GigBook</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Connecting artists with perfect venues to create unforgettable events and lasting partnerships.
            </p>
            <div className="flex gap-4">
              {/* Social Media Icons */}
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>

          {/* For Artists */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Artists</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/register?role=artist" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Sign Up as Artist
                </Link>
              </li>
              <li>
                <Link href="/artists" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Browse Artists
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* For Venues */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Venues</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/register?role=venue" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Sign Up as Venue
                </Link>
              </li>
              <li>
                <Link href="/venues" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Browse Venues
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  List Your Venue
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} GigBook. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Privacy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Terms
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

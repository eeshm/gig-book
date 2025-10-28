import type { Metadata } from "next";
import localFont from "next/font/local";
import { Manrope, Oswald } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import AuthInitializer from "@/components/shared/AuthInitializer";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-family-manrope",
});
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-family-oswald",
});

export const metadata: Metadata = {
  title: "GigBook | Fiverr for Gigs",
  description: "A modern platform connecting artists and venues for seamless gig bookings.",
  keywords: ["gigs", "artists", "venues", "booking platform", "DJ", "live music", "entertainment"],
  authors: [{ name: "Eesh Midha", url: "https://gig-book.vercel.app" }],
  creator: "Eesh Midha",
  openGraph: {
    title: "GigBook | Fiverr for Gigs",
    description: "The easiest way to connect performers and venues.",
    url: "https://gig-book.vercel.app",
    siteName: "GigBook",
    images: [
      {
        url: "/landing2.png",
        width: 1200,
        height: 630,
        alt: "GigBook – Fiverr for Gigs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GigBook | Fiverr for Gigs",
    description: "The easiest way to connect performers and venues.",
    images: ["/landing2.png"],
    creator: "@eeshmidha1",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${oswald.variable} selection:text-primary-foreground font-sans selection:bg-blue-900`}
      >
        <Providers>
          <AuthInitializer>
            <ConditionalNavbar />
            {children}
            <Analytics />
            <Toaster position="bottom-left" />
          </AuthInitializer>
        </Providers>
      </body>
    </html>
  );
}

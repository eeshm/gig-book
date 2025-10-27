import type { Metadata } from "next";
import localFont from "next/font/local";
import { Manrope, Oswald } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import AuthInitializer from "@/components/shared/AuthInitializer";

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
  title: "GigBook - Artist & Venue Booking Platform",
  description: "Connect artists with venues for unforgettable performances",
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
            <Toaster position="bottom-left" />
          </AuthInitializer>
        </Providers>
      </body>
    </html>
  );
}

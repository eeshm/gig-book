"use client"
import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get role from search params, default to ARTIST
  const roleParam = searchParams.get("role");
  const role = roleParam?.toUpperCase() === "VENUE" ? "VENUE" : "ARTIST";
  
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Form */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          {/* Back to home link */}
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ChevronLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Card Container */}
          <div className="shadow-xl backdrop-blur-sm">
            {/* Role Badge */}
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-md outline outline-offset-3">
              <span className="w-1 h-1 rounded-full bg-gray-300/80"></span>
              <span className="text-[10px] font-semibold text-gray-300 uppercase tracking-wide">
                {role === "VENUE" ? "Venue Account" : "Artist Account"}
              </span>
            </div>

            {/* Auth Form */}
            <AuthForm mode="register" initialRole={role} />
          </div>

          {/* Help text */}
          <div className="mt-8 p-4 rounded-lg border border-border/30 bg-card/50 backdrop-blur-sm text-center">
            <p className="text-xs text-muted-foreground leading-relaxed">
              By signing up, you agree to our{" "}
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                Terms of Service
              </a>
              {" "}and{" "}
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image (Hidden on Mobile) */}
      <div className="hidden lg:flex w-2/5 relative overflow-hidden">
        <Image
          src="/images/image10.jpg"
          alt="Register illustration"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/50"></div>
      </div>
    </div>
  );
}
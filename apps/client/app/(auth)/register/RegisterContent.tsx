"use client";
import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function RegisterContent() {
  const searchParams = useSearchParams();

  // Get role from search params, default to ARTIST
  const roleParam = searchParams.get("role");
  const role = roleParam?.toUpperCase() === "VENUE" ? "VENUE" : "ARTIST";

  return (
    <>
      {/* Back to home link */}
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1 text-sm transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to home
      </Link>

      {/* Card Container */}
      <div className="shadow-xl backdrop-blur-sm">
        {/* Role Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-md px-3 py-1 outline outline-offset-3">
          <span className="h-1 w-1 rounded-full bg-gray-300/80"></span>
          <span className="text-[10px] font-semibold tracking-wide text-gray-300 uppercase">
            {role === "VENUE" ? "Venue Account" : "Artist Account"}
          </span>
        </div>

        {/* Auth Form */}
        <AuthForm mode="register" initialRole={role} />
      </div>

      {/* Help text */}
      <div className="border-border/30 bg-card/50 mt-8 rounded-lg border p-4 text-center backdrop-blur-sm">
        <p className="text-muted-foreground text-xs leading-relaxed">
          By signing up, you agree to our{" "}
          <a href="#" className="text-primary hover:text-primary/80 transition-colors">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:text-primary/80 transition-colors">
            Privacy Policy
          </a>
        </p>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, User, Building2 } from "lucide-react";
import AuthForm from "@/components/auth/AuthForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function LoginPage() {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const router = useRouter();

  const handleRoleSelect = (role: "artist" | "venue") => {
    setIsRoleModalOpen(false);
    router.push(`/register?role=${role}`);
  };

  return (
    <div className="bg-background flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex w-full items-center justify-center p-4 lg:w-3/5 lg:p-8">
        <div className="w-full max-w-md">
          {/* Back to home link */}
          <Link href="/" className="subtext mb-6 inline-flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to home
          </Link>

          {/* Card Container */}
          <div className="bg-card shadow-xl backdrop-blur-sm">
            {/* Auth Form */}
            <AuthForm mode="login" />
          </div>
        </div>
      </div>

      {/* Right Side - Image (Hidden on Mobile) */}
      <div className="relative hidden w-2/5 overflow-hidden lg:flex">
        <Image
          src="/images/image12.jpg"
          alt="Login illustration"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay Gradient */}
        <div className="to-background/50 absolute inset-0 bg-gradient-to-l from-transparent via-transparent"></div>
      </div>

      {/* Role Selection Modal */}
      <Dialog open={isRoleModalOpen} onOpenChange={setIsRoleModalOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="mb-2 text-center text-3xl font-bold">
              Choose Your Role
            </DialogTitle>
            <DialogDescription className="text-center">
              Select how you want to join GigBook
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-6">
            {/* Artist Option */}
            <button
              onClick={() => handleRoleSelect("artist")}
              className="group border-border/60 hover:border-primary bg-card hover:bg-card/50 relative overflow-hidden rounded-xl border-2 p-6 transition-all duration-300"
            >
              <div className="from-primary/10 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              <div className="relative">
                <div className="group-hover:bg-primary/20 mb-3 flex h-12 w-12 items-center justify-center transition-colors"></div>
                <h3 className="text-foreground group-hover:text-primary mb-2 text-lg font-bold transition-colors">
                  I'm an Artist
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Showcase your talent and get discovered by venues
                </p>
              </div>
            </button>

            {/* Venue Option */}
            <button
              onClick={() => handleRoleSelect("venue")}
              className="group border-border/60 bg-card hover:bg-card/50 relative overflow-hidden rounded-xl border-2 p-6 transition-all duration-300 hover:border-blue-500"
            >
              <div className="relative">
                <div className="mb-3 flex h-12 w-12 items-center justify-center transition-colors group-hover:bg-blue-500/20"></div>
                <h3 className="text-foreground mb-2 text-lg font-bold transition-colors group-hover:text-blue-500">
                  I'm a Venue
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Find and book amazing artists for your events
                </p>
              </div>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

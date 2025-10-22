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
          <div className="bg-card shadow-xl backdrop-blur-sm">
            {/* Auth Form */}
            <AuthForm mode="login" />
          </div>
        </div>
      </div>

      {/* Right Side - Image (Hidden on Mobile) */}
      <div className="hidden lg:flex w-2/5 relative overflow-hidden">
        <Image
          src="/images/image12.jpg"
          alt="Login illustration"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/50"></div>
      </div>

      {/* Role Selection Modal */}
      <Dialog open={isRoleModalOpen} onOpenChange={setIsRoleModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center mb-2">
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
              className="relative group p-6 border-2 border-border/60 rounded-xl hover:border-primary transition-all duration-300 bg-card hover:bg-card/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-12 h-12  flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  I'm an Artist
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Showcase your talent and get discovered by venues
                </p>
              </div>
            </button>

            {/* Venue Option */}
            <button
              onClick={() => handleRoleSelect("venue")}
              className="relative group p-6 border-2 border-border/60 rounded-xl hover:border-blue-500 transition-all duration-300 bg-card hover:bg-card/50 overflow-hidden"
            >
              <div className="relative">
                <div className="w-12 h-12 flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors">
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-blue-500 transition-colors">
                  I'm a Venue
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
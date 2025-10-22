"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-left  mb-8">
          <h1 className="text-4xl text-foreground mb-2">Log in</h1>
        </div>

        <div className="bg-card p-4shadow-lg">
          <AuthForm mode="login" />

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                onClick={() => setIsRoleModalOpen(true)}
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        <Dialog open={isRoleModalOpen} onOpenChange={setIsRoleModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                Choose Your Role
              </DialogTitle>
              <DialogDescription className="text-center">
                Select how you want to sign up
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <button
                onClick={() => handleRoleSelect("artist")}
                className="flex flex-col items-center justify-center p-6 border-2 border-border rounded-lg hover:border-primary hover:bg-accent transition-all duration-200 group"
              >
                <div className="text-4xl mb-2">🎤</div>
                <h3 className="text-xl font-semibold mb-1 group-hover:text-primary">
                  I'm an Artist
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Showcase your talent and get booked for gigs
                </p>
              </button>
              <button
                onClick={() => handleRoleSelect("venue")}
                className="flex flex-col items-center justify-center p-6 border-2 border-border rounded-lg hover:border-primary hover:bg-accent transition-all duration-200 group"
              >
                <div className="text-4xl mb-2">🏛️</div>
                <h3 className="text-xl font-semibold mb-1 group-hover:text-primary">
                  I'm a Venue
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Find and book talented artists for your venue
                </p>
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
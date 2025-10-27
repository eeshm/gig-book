import { Suspense } from "react";
import RegisterContent from "./RegisterContent";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="bg-background flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex w-full items-center justify-center p-4 lg:w-3/5 lg:p-8">
        <div className="w-full max-w-md">
          <Suspense fallback={<div className="bg-muted h-96 animate-pulse rounded-lg" />}>
            <RegisterContent />
          </Suspense>
        </div>
      </div>

      {/* Right Side - Image (Hidden on Mobile) */}
      <div className="relative hidden w-2/5 overflow-hidden lg:flex">
        <Image
          src="/images/image10.jpg"
          alt="Register illustration"
          width={400}
          height={400}
          className="object-cover"
          priority
        />
        {/* Overlay Gradient */}
        <div className="to-background/50 absolute inset-0 bg-gradient-to-l from-transparent via-transparent"></div>
      </div>
    </div>
  );
}

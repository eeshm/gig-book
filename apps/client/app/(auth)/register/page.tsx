"use client"
import AuthForm from "@/components/auth/AuthForm";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get role from search params, default to ARTIST
  const roleParam = searchParams.get("role");
  const role = roleParam?.toUpperCase() === "VENUE" ? "VENUE" : "ARTIST";
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-left px-4 mb-4">
          <h1 className="text-4xl font-bold text-foreground mb-2">Get Started</h1>
          <p className="text-muted-foreground">Create your account to start booking gigs</p>
        </div>

        <div className="bg-card p-4  shadow-lg">
          <AuthForm mode="register" initialRole={role} />

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button onClick={() => router.push("/login")} className="text-primary hover:underline font-medium">
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState, useRef } from "react";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, register, clearError } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { UserRole } from "@/types";
import TriangleWarning from "@/public/src/assets/triangle-warning";
import { signIn } from "next-auth/react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ARTIST", "VENUE"]),
});

// Superset type covering both login and register forms for React Hook Form generics
type AuthFormValues = {
  name?: string;
  email: string;
  password: string;
  role?: "ARTIST" | "VENUE";
};

interface AuthFormProps {
  mode: "login" | "register";
  initialRole?: UserRole;
}

export default function AuthForm({ mode, initialRole = "ARTIST" }: AuthFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [googleLoading, setGoogleLoading] = useState(false);
  const hasRedirectedRef = useRef(false);

  const schema = mode === "login" ? loginSchema : registerSchema;

  const {
    register: registerField,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(schema),
    defaultValues: mode === "register" ? { role: initialRole } : undefined,
  });

  useEffect(() => {
    if (mode === "register") {
      setValue("role", initialRole);
    }
  }, [initialRole, setValue, mode]);

  // Only redirect once after successful auth
  useEffect(() => {
    if (isAuthenticated && user && !hasRedirectedRef.current) {
      hasRedirectedRef.current = true;
      const redirectPath = user.role === "ARTIST" ? "/dashboard/artist" : "/dashboard/venue";
      // Use a small delay to ensure Redux state is properly synchronized
      const timer = setTimeout(() => {
        router.push(redirectPath);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit = async (data: AuthFormValues) => {
    if (mode === "login") {
      await dispatch(login({ email: data.email, password: data.password }));
    } else {
      await dispatch(
        register({
          name: data.name ?? "",
          email: data.email,
          password: data.password,
          role: (data.role as UserRole) ?? initialRole,
        })
      );
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      if (mode === "register") {
        // For signup: Store the role in sessionStorage so auth.ts can access it
        sessionStorage.setItem("googleSignupRole", initialRole);
        await signIn("google", {
          callbackUrl: `/dashboard/${initialRole === "ARTIST" ? "artist" : "venue"}`,
          redirect: true,
        });
      } else {
        // For login: Direct Google sign-in
        // After Google auth, NextAuth will redirect, then providers.tsx will sync role to Redux
        // The middleware/dashboard will handle redirecting to correct role dashboard
        await signIn("google", {
          callbackUrl: "/dashboard/artist", // Temporary redirect, will be handled by dashboard logic
          redirect: true,
        });
      }
    } catch (error) {
      console.error("Google authentication error:", error);
      toast.error("Authentication failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 space-y-1">
        <h1 className="subheading text-foreground">
          {mode === "login" ? "Welcome Back" : "Get Started"}
        </h1>
        <p className="subtext">
          {mode === "login"
            ? "Sign in to your account to continue"
            : "Create your account and start booking"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {mode === "register" && (
          <>
            {/* Hidden field to register role with React Hook Form */}
            <input type="hidden" {...registerField("role")} />

            <div className="space-y-2">
              <Label htmlFor="name" className="subtext">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                {...registerField("name")}
                className="border-border/60 focus:border-primary h-11 rounded-lg px-4 text-base text-white transition-colors"
              />
              {errors.name && (
                <p className="text-destructive flex items-center gap-1 text-sm">
                  <TriangleWarning className="h-4 w-4" />
                  {errors.name.message}
                </p>
              )}
            </div>
          </>
        )}

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="subtext">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            {...registerField("email")}
            className="border-border/60 focus:border-primary h-11 rounded-lg bg-black px-4 text-base text-white transition-colors"
          />
          {errors.email && (
            <p className="text-destructive flex items-center gap-1 text-sm">
              <TriangleWarning className="h-4 w-4" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="subtext">
              Password
            </Label>
          </div>
          <Input
            id="password"
            type="password"
            {...registerField("password")}
            className="border-border/60 focus:border-primary h-11 rounded-lg px-4 text-base text-white transition-colors"
          />
          {errors.password && (
            <p className="text-destructive flex items-center gap-1 text-sm">
              <TriangleWarning className="h-4 w-4" />
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="text-foreground h-11 w-full rounded-lg text-base transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {mode === "login" ? "Signing in..." : "Creating account..."}
            </span>
          ) : mode === "login" ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </Button>

        {/* Google Sign-In / Sign-Up - For Both Login and Register */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="border-border w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card text-muted-foreground px-2">Or continue with</span>
          </div>
        </div>

        {/* Google Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
        >
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {googleLoading
            ? mode === "login"
              ? "Signing in..."
              : "Creating account..."
            : mode === "login"
              ? "Sign in with Google"
              : "Sign up with Google"}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="border-border/30 w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            </span>
          </div>
        </div>

        {/* Auth Link */}
        <div className="text-center">
          {mode === "login" ? (
            <p className="text-muted-foreground text-sm">
              Sign up as{" "}
              <a
                href="/register?role=artist"
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Artist
              </a>{" "}
              or{" "}
              <a
                href="/register?role=venue"
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Venue
              </a>
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Sign in
              </a>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

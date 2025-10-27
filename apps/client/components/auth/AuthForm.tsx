"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
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

  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = user.role === "ARTIST" ? "/dashboard/artist" : "/dashboard/venue";
      router.push(redirectPath);
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
          className="h-11 w-full rounded-lg text-base text-foreground transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
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

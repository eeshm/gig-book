"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, register, clearError } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { UserRole } from "@/types";

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

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

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
    // Cast resolver because schema varies by mode; our form value type is a superset
    resolver: zodResolver(schema) as any,
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
      await dispatch(
        login({ email: data.email, password: data.password })
      );
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
      <div className="space-y-1 mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          {mode === "login" ? "Welcome Back" : "Get Started"}
        </h1>
        <p className="text-muted-foreground text-sm">
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
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <Input
                id="name"
                type="text"
                {...registerField("name")}
                className="rounded-lg h-11 px-4 border-border/60 focus:border-primary transition-colors"
              />
              {errors.name && (
                <p className="text-sm text-destructive flex items-center gap-1 ">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name.message}
                </p>
              )}
            </div>
          </>
        )}

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
          <Input
            id="email"
            type="email"
            {...registerField("email")}
            className="rounded-lg h-11 px-4 border-border/60 focus:border-primary transition-colors"
          />
          {errors.email && (
            <p className="text-sm text-destructive flex items-center gap-1 ">
              <AlertCircle className="w-4 h-4" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            {...registerField("password")}
            className="rounded-lg h-11 px-4 border-border/60 focus:border-primary transition-colors"
          />
          {errors.password && (
            <p className="text-sm text-destructive flex items-center gap-1 ">
              <AlertCircle className="w-4 h-4" />
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full h-11 text-base text-black rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed" 
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {mode === "login" ? "Signing in..." : "Creating account..."}
            </span>
          ) : (
            mode === "login" ? "Sign In" : "Create Account"
          )}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/30"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-background text-muted-foreground">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            </span>
          </div>
        </div>

        {/* Auth Link */}
        <div className="text-center">
          {mode === "login" ? (
            <p className="text-sm text-muted-foreground">
              Sign up as{" "}
              <a href="/register?role=artist" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                Artist
              </a>
              {" "}or{" "}
              <a href="/register?role=venue" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                Venue
              </a>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                Sign in
              </a>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
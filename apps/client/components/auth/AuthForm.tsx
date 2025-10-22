"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {mode === "register" && (
          <>
            {/* Hidden field to register role with React Hook Form */}
            <input type="hidden" {...registerField("role")} />
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                {...registerField("name")}
                className="mt-2 rounded-xs h-[42px]"
              />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
            </div>
          </>
        )}

        {/* Email Field */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...registerField("email")}
            className="mt-2 rounded-xs h-[42px]"
          />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...registerField("password")}
            className="mt-2 rounded-xs h-[42px]"
          />
          {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full h-[42px] text-black" disabled={loading}>
          {loading ? "Loading..." : mode === "login" ? "Login" : "Create Account"}
        </Button>
      </form>
    </div>
  );
}
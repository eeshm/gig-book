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

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [selectedRole, setSelectedRole] = useState<UserRole>("ARTIST");

  const schema = mode === "login" ? loginSchema : registerSchema;

  const {
    register: registerField,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: mode === "register" ? { role: "ARTIST" } : undefined,
  });

  useEffect(() => {
    if (mode === "register") {
      setValue("role", selectedRole);
    }
  }, [selectedRole, setValue, mode]);

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

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    if (mode === "login") {
      await dispatch(login(data as LoginFormData));
    } else {
      await dispatch(register(data as RegisterFormData));
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {mode === "register" && (
          <>
            {/* Role Selection */}
            <div>
              <Label className="mb-3 block">I am a</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={selectedRole === "ARTIST" ? "default" : "outline"}
                  onClick={() => setSelectedRole("ARTIST")}
                  className="h-20"
                >
                  <div className="text-center">
                    <div className="font-semibold">Artist</div>
                    <div className="text-xs opacity-80">DJ, Singer, Performer</div>
                  </div>
                </Button>
                <Button
                  type="button"
                  variant={selectedRole === "VENUE" ? "default" : "outline"}
                  onClick={() => setSelectedRole("VENUE")}
                  className="h-20"
                >
                  <div className="text-center">
                    <div className="font-semibold">Venue</div>
                    <div className="text-xs opacity-80">Club, Restaurant, Event</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Name Field */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...registerField("name")}
                className="mt-2"
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
            placeholder="Enter your email"
            {...registerField("email")}
            className="mt-2"
          />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...registerField("password")}
            className="mt-2"
          />
          {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : mode === "login" ? "Login" : "Create Account"}
        </Button>
      </form>
    </div>
  );
}
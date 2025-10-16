"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerUser } from "@/store/slices/authSlice";
import { RootState, AppDispatch } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import toast from "react-hot-toast";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ARTIST", "VENUE"])
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);
  const [selectedRole, setSelectedRole] = useState<"ARTIST" | "VENUE">(
    (searchParams.get("role")?.toUpperCase() as "ARTIST" | "VENUE") || "ARTIST"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: selectedRole },
  });

  useEffect(() => {
    if (user) {
      router.push(`/dashboard/${user.role.toLowerCase()}`);
    }
  }, [user, router]);

  useEffect(() => {
    setValue("role", selectedRole);
  }, [selectedRole, setValue]);

  const onSubmit = async (data: RegisterFormData) => {
    const result = await dispatch(
      registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      })
    );

    if (registerUser.fulfilled.match(result)) {
      toast.success("Registration successful!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-8">
        <h1 className="mb-2 text-2xl font-bold text-white">Create Account</h1>
        <p className="mb-6 text-slate-400">Join as an artist or venue</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-slate-200">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="mt-2 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/30"
              {...register("name")}
            />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-slate-200">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-2 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/30"
              {...register("email")}
            />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
          </div>

          {/* Role Selection */}
          {/* <div>
            <Label className="text-slate-200 block mb-2">I am a...</Label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole("ARTIST")}
                className={`flex-1 py-2 px-4 rounded border-2 font-medium transition ${
                  selectedRole === "ARTIST"
                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500"
                }`}
              >
                Artist
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("VENUE")}
                className={`flex-1 py-2 px-4 rounded border-2 font-medium transition ${
                  selectedRole === "VENUE"
                    ? "border-purple-500 bg-purple-500/10 text-purple-400"
                    : "border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500"
                }`}
              >
                Venue
              </button>
            </div>
          </div> */}

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-slate-200">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••"
              className="mt-2 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/30"
              {...register("password")}
            />
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
          </div>


          {/* Error Message */}
          {error && (
            <div className="rounded bg-red-500/10 border border-red-500 p-3">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-blue-400 hover:text-blue-300">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
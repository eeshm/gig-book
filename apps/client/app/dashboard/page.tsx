// app/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Loader } from "lucide-react";

export default function DashboardHub() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user) {
      router.push(`/dashboard/${user.role.toLowerCase()}`);
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader className="h-8 w-8 text-blue-500 animate-spin" />
        <p className="text-slate-300">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
// app/dashboard/venue/page.tsx
"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Calendar, Music } from "lucide-react";

export default function VenueDashboard() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Venue Dashboard</h1>
          <p className="text-slate-400">Welcome, {user?.name}!</p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-6">
            <div className="flex items-center gap-4">
              <MapPin className="h-10 w-10 text-blue-500" />
              <div>
                <p className="text-sm text-slate-400">Profile Status</p>
                <p className="text-2xl font-bold text-white">Incomplete</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-6">
            <div className="flex items-center gap-4">
              <Calendar className="h-10 w-10 text-yellow-500" />
              <div>
                <p className="text-sm text-slate-400">Pending Responses</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-6">
            <div className="flex items-center gap-4">
              <Music className="h-10 w-10 text-purple-500" />
              <div>
                <p className="text-sm text-slate-400">Confirmed Bookings</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="rounded-lg bg-purple-600/10 border border-purple-500/20 p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Get Started</h2>
          <p className="text-slate-300 mb-6">
            Set up your venue profile and start booking amazing artists.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard/venue/profile">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Complete Profile
              </Button>
            </Link>
            <Link href="/dashboard/bookings">
              <Button variant="outline" className="border-slate-600 hover:bg-slate-800">
                View Bookings
              </Button>
            </Link>
          </div>
        </div>

        {/* Placeholder for Phase 2 */}
        <div className="mt-12 p-6 rounded-lg bg-slate-800/30 border border-slate-700 border-dashed">
          <p className="text-center text-slate-400">
            🚀 Profile management and artist search coming in Phase 2
          </p>
        </div>
      </div>
    </div>
  );
}
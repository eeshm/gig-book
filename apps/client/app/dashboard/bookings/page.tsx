// app/dashboard/bookings/page.tsx
"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function BookingsPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Bookings</h1>
          <p className="text-slate-400">
            {user?.role === "ARTIST"
              ? "Manage your booking requests and gigs"
              : "Manage your booking requests and artist responses"}
          </p>
        </div>

        {/* Placeholder */}
        <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-12 text-center">
          <Calendar className="mx-auto h-12 w-12 text-slate-500 mb-4" />
          <h2 className="text-lg font-semibold text-white mb-2">No Bookings Yet</h2>
          <p className="text-slate-400 mb-6">
            {user?.role === "ARTIST"
              ? "You haven't received any booking requests yet. Venues will send you requests once your profile is complete."
              : "You haven't created any bookings yet. Search for artists and create a booking to get started."}
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            {user?.role === "ARTIST" ? "View Profile" : "Search Artists"}
          </Button>
        </div>

        {/* Coming in Phase 3 */}
        <div className="mt-8 p-6 rounded-lg bg-slate-800/30 border border-slate-700 border-dashed">
          <p className="text-center text-slate-400">
            🚀 Full booking management coming in Phase 3
          </p>
        </div>
      </div>
    </div>
  );
}
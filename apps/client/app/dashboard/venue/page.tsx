"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchMyVenueProfile,
  createVenueProfile,
  updateVenueProfile,
} from "@/store/slices/venueSlice";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProfileForm from "@/components/profile/ProfileForm";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { CreateVenueData, CreateArtistData } from "@/types";
import { toast } from "react-hot-toast";
import { Building2, Edit, MapPin, Users } from "lucide-react";

export default function VenueDashboardPage() {
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((state) => state.venue);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchMyVenueProfile());
  }, [dispatch]);

  const handleCreateProfile = async (data: CreateVenueData | CreateArtistData) => {
    const venueData = data as CreateVenueData;
    const result = await dispatch(createVenueProfile(venueData));
    if (createVenueProfile.fulfilled.match(result)) {
      toast.success("Profile created successfully!");
      setIsEditing(false);
    }
  };

  const handleUpdateProfile = async (data: CreateVenueData | CreateArtistData) => {
    if (!profile) return;
    const venueData = data as CreateVenueData;
    const result = await dispatch(
      updateVenueProfile({ id: profile.id, data: venueData })
    );
    if (updateVenueProfile.fulfilled.match(result)) {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    }
  };

  if (loading && !profile) {
    return (
      <DashboardLayout>
        <LoadingSpinner size="lg" text="Loading your profile..." />
      </DashboardLayout>
    );
  }

  // No profile exists - Show create form
  if (!profile && !loading) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <EmptyState
            icon={Building2}
            title="Create Your Venue Profile"
            description="Set up your venue profile to start booking talented artists for your events."
            actionLabel=""
          />
          <div className="bg-card p-8 rounded-xl border border-border shadow-lg mt-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Venue Information</h2>
            <ProfileForm
              role="VENUE"
              onSubmit={handleCreateProfile}
              loading={loading}
            />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Profile exists - Show profile view or edit form
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Venue</h1>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        {isEditing ? (
          <div className="bg-card p-8 rounded-xl border border-border shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-6">Edit Profile</h2>
            <ProfileForm
              role="VENUE"
              initialData={profile}
              onSubmit={handleUpdateProfile}
              loading={loading}
            />
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Profile Info Card */}
            <div className="bg-card p-8 rounded-xl border border-border shadow-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Venue Name</p>
                  <p className="text-2xl font-bold text-foreground">{profile?.venueName}</p>
                </div>

                {profile?.venueType && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Type</p>
                    <p className="text-lg text-foreground">{profile.venueType}</p>
                  </div>
                )}

                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{profile?.location}</span>
                </div>

                {profile?.capacity && (
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>Capacity: {profile.capacity}</span>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Description</p>
                  <p className="text-foreground">{profile?.description}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-card p-8 rounded-xl border border-border shadow-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/artists">
                  <Button className="w-full">Browse Artists</Button>
                </Link>
                <Link href="/dashboard/bookings">
                  <Button variant="outline" className="w-full">
                    View My Bookings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
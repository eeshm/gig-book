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
    } else if (createVenueProfile.rejected.match(result)) {
      const error = result.payload as string;
      // If profile already exists, force refetch to load it
      if (error?.includes("already exists")) {
        console.log("Profile exists, fetching...");
        const fetchResult = await dispatch(fetchMyVenueProfile());
        if (fetchMyVenueProfile.fulfilled.match(fetchResult)) {
          toast.success("Profile loaded successfully!");
        } else {
          toast.error("Profile exists but couldn't be loaded. Please refresh the page.");
        }
      } else {
        toast.error("Failed to create profile. Please try again.");
      }
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
      // Profile is already updated in state from the update response
      setIsEditing(false);
    } else if (updateVenueProfile.rejected.match(result)) {
      toast.error("Failed to update profile. Please try again.");
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
          <div className="bg-card p-4 sm:p-6 lg:p-8 rounded-xl border border-border shadow-lg mt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Venue Information</h2>
            <ProfileForm
              role="VENUE"
              onSubmit={handleCreateProfile}
              loading={loading}
            />
            <div className="mt-4">
              <Button 
                variant="outline" 
                onClick={() => dispatch(fetchMyVenueProfile())}
                className="w-full"
              >
                Refresh / Check for Existing Profile
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Profile exists - Show profile view or edit form
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Venue</h1>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} className="w-full sm:w-auto">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        {isEditing ? (
          <div className="bg-card p-4 sm:p-6 lg:p-8 rounded-xl border border-border shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Edit Profile</h2>
            <ProfileForm
              role="VENUE"
              initialData={profile}
              onSubmit={handleUpdateProfile}
              loading={loading}
            />
            <Button
              variant="outline"
              className="mt-6 w-full sm:w-auto"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {/* Profile Info Card */}
            <div className="bg-card p-4 sm:p-6 lg:p-8 rounded-xl border border-border shadow-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Venue Name</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{profile?.venueName}</p>
                </div>
                {profile?.venueType && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Type</p>
                    <p className="text-base sm:text-lg text-foreground">{profile.venueType}</p>
                  </div>
                )}

                <div className="flex items-center space-x-2 text-muted-foreground text-sm sm:text-base">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{profile?.location}</span>
                </div>

                {profile?.capacity && (
                  <div className="flex items-center space-x-2 text-muted-foreground text-sm sm:text-base">
                    <Users className="w-4 h-4 flex-shrink-0" />
                    <span>Capacity: {profile.capacity}</span>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Description</p>
                  <p className="text-sm sm:text-base text-foreground">{profile?.description}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-card p-4 sm:p-6 lg:p-8 shadow-lg border border-border rounded-xl">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="gap-4 flex flex-col">
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
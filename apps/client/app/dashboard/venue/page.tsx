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
import { Button } from "@/components/ui/button";
import { CreateVenueData, CreateArtistData } from "@/types";
import { toast } from "react-hot-toast";
import { Building2, Edit, MapPin, Users, X } from "lucide-react";
import Image from "next/image";

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
    const result = await dispatch(updateVenueProfile({ id: profile.id, data: venueData }));
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
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <div className="mb-8 text-center">
              <div className="from-primary to-primary/60 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br shadow-lg">
                <Building2 className="text-foreground h-8 w-8" />
              </div>
              <h1 className="text-foreground mb-2 text-3xl font-bold sm:text-4xl">
                Create Your Venue Profile
              </h1>
              <p className="text-foreground/70">
                Set up your venue profile to start booking talented artists for your events.
              </p>
              <div className="from-primary to-primary/40 mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r" />
            </div>
          </div>

          <div className="relative">
            <div className="from-primary/20 to-primary/5 absolute inset-0 rounded-2xl bg-gradient-to-br opacity-50 blur-xl" />
            <div className="bg-card/80 border-primary/20 relative rounded-2xl border p-6 shadow-xl backdrop-blur-sm sm:p-8">
              <h2 className="text-foreground mb-6 text-2xl font-bold">Venue Information</h2>
              <ProfileForm role="VENUE" onSubmit={handleCreateProfile} loading={loading} />
              <div className="mt-6">
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
        </div>
      </DashboardLayout>
    );
  }

  // Profile exists - Show profile view or edit form
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="heading">My Venue</h1>
              <div className="from-primary via-primary/40 h-1 w-20 rounded-full bg-gradient-to-r to-transparent" />
            </div>
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="from-primary to-primary/80 hover:shadow-primary/50 h-12 rounded-lg bg-gradient-to-r px-6 font-semibold transition-all hover:shadow-lg"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="relative">
            <div className="from-primary/20 to-primary/5 absolute inset-0 rounded-2xl bg-gradient-to-br opacity-50 blur-xl" />
            <div className="bg-card/80 border-primary/20 relative rounded-2xl border p-6 shadow-xl backdrop-blur-sm sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-foreground text-2xl font-bold">Edit Profile</h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="hover:bg-muted rounded-lg p-2 transition-colors"
                >
                  <X className="text-muted-foreground h-5 w-5" />
                </button>
              </div>
              <ProfileForm
                role="VENUE"
                initialData={profile}
                onSubmit={handleUpdateProfile}
                loading={loading}
              />
              <Button variant="outline" className="mt-6" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Profile Card */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="from-primary/20 to-primary/5 absolute inset-0 rounded-2xl bg-gradient-to-br opacity-50 blur-xl" />
                <div className="bg-card/80 border-primary/20 relative rounded-2xl border p-8 shadow-xl backdrop-blur-sm">
                  <div className="mb-8">
                    <h3 className="text-foreground mb-6 flex items-center gap-2 text-2xl font-bold">
                      <Building2 className="text-primary h-6 w-6" />
                      Venue Details
                    </h3>
                    <div className="from-primary via-primary/40 h-1 w-20 rounded-full bg-gradient-to-r to-transparent" />
                  </div>

                  <div className="space-y-6">
                    {/* Venue Name */}
                    <div className="bg-primary/10 rounded-lg p-4 transition-colors">
                      <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
                        Venue Name
                      </p>
                      <p className="text-foreground text-2xl font-bold">{profile?.venueName}</p>
                    </div>

                    {/* Venue Type */}
                    {profile?.venueType && (
                      <div className="bg-primary/10 rounded-lg p-4 transition-colors">
                        <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
                          Venue Type
                        </p>
                        <p className="text-foreground text-lg font-semibold">{profile.venueType}</p>
                      </div>
                    )}

                    {/* Location */}
                    <div className="bg-primary/10 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="text-primary h-5 w-5 flex-shrink-0" />
                        <div>
                          <p className="text-foreground/60 mb-1 text-xs font-semibold tracking-wide uppercase">
                            Location
                          </p>
                          <p className="text-foreground text-lg font-semibold">
                            {profile?.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Capacity */}
                    {profile?.capacity && (
                      <div className="bg-primary/10 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <Users className="text-primary h-5 w-5 flex-shrink-0" />
                          <div>
                            <p className="text-foreground/60 mb-1 text-xs font-semibold tracking-wide uppercase">
                              Capacity
                            </p>
                            <p className="text-foreground text-2xl font-bold">
                              {profile.capacity}{" "}
                              <span className="text-foreground/60 text-sm">people</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    <div className="border-secondary/50 rounded-lg border p-4">
                      <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wide uppercase">
                        Description
                      </p>
                      <p className="text-foreground/80 leading-relaxed">{profile?.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              <div className="relative">
                <div className="from-primary/20 to-primary/5 absolute inset-0 rounded-2xl bg-gradient-to-br opacity-50 blur-xl" />
                <div className="from-primary to-primary/80 text-foreground relative rounded-2xl bg-gradient-to-br p-6 shadow-xl">
                  <div className="text-center">
                    <Building2 className="text-foreground/90 mx-auto mb-3 h-8 w-8" />
                    <p className="text-foreground/80 mb-2 text-sm">Your Venue Profile is</p>
                    <p className="text-3xl font-bold">Active</p>
                    <p className="text-foreground/70 mt-3 text-xs">Ready to book artists!</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="from-primary/20 to-primary/5 absolute inset-0 rounded-2xl bg-gradient-to-br opacity-50 blur-xl" />
                <div className="bg-card/80 border-primary/20 relative rounded-2xl border p-6 shadow-xl backdrop-blur-sm">
                  <h4 className="text-foreground mb-4 font-semibold">Quick Info</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Media Files</span>
                      <span className="text-foreground font-semibold">
                        {profile?.mediaUrls?.length || 0}
                      </span>
                    </div>
                    <div className="bg-border h-px" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Profile Status</span>
                      <span className="text-primary font-semibold">Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Media Gallery Card */}
        {!isEditing && (
          <div className="relative mt-8">
            <div className="from-primary/20 to-primary/5 absolute inset-0 rounded-2xl bg-gradient-to-br opacity-50 blur-xl" />
            <div className="bg-card/80 border-primary/20 relative rounded-2xl border p-8 shadow-xl backdrop-blur-sm">
              <h3 className="text-foreground mb-6 flex items-center gap-2 text-2xl font-bold">
                <Building2 className="text-primary h-6 w-6" />
                Media Gallery
              </h3>
              {profile?.mediaUrls && profile.mediaUrls.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {profile.mediaUrls.map((url, index) => (
                    <div
                      key={index}
                      className="bg-muted group aspect-square cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all hover:shadow-xl"
                    >
                      {url.includes("video") ? (
                        <video
                          src={url}
                          className="h-full w-full object-cover transition-transform group-hover:scale-110"
                          controls
                        />
                      ) : (
                        <Image
                          src={url}
                          alt={`Media ${index + 1}`}
                          className="h-full w-full object-cover transition-transform group-hover:scale-110"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Building2 className="text-muted-foreground/30 mx-auto mb-3 h-12 w-12" />
                  <p className="text-muted-foreground">No media uploaded yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Actions Card */}
        {!isEditing && (
          <div className="relative mt-8">
            <div className="from-primary/20 to-primary/5 absolute inset-0 rounded-2xl bg-gradient-to-br opacity-50 blur-xl" />
            <div className="bg-card/80 border-primary/20 relative rounded-2xl border p-8 shadow-xl backdrop-blur-sm">
              <h3 className="text-foreground mb-6 flex items-center gap-2 text-2xl font-bold">
                Quick Actions
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link href="/artists" className="w-full">
                  <Button className="from-primary to-primary/80 hover:shadow-primary/50 h-12 w-full rounded-lg bg-gradient-to-r font-semibold transition-all hover:shadow-lg">
                    <Building2 className="mr-2 h-4 w-4" />
                    Browse Artists
                  </Button>
                </Link>
                <Link href="/dashboard/bookings" className="w-full">
                  <Button variant="outline" className="h-12 w-full rounded-lg font-semibold">
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

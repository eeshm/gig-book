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
import { Building2, Edit, MapPin, Users, X, Sparkles } from "lucide-react";

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
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                <Building2 className="w-8 h-8 text-foreground" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Create Your Venue Profile
              </h1>
              <p className="text-foreground/70">Set up your venue profile to start booking talented artists for your events.</p>
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-primary/40 rounded-full mx-auto mt-4" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl opacity-50" />
            <div className="relative bg-card/80 backdrop-blur-sm border border-primary/20 p-6 sm:p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Venue Information</h2>
              <ProfileForm
                role="VENUE"
                onSubmit={handleCreateProfile}
                loading={loading}
              />
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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h1 className="heading">My Venue</h1>
                <div className="h-1 w-20 bg-gradient-to-r from-primary via-primary/40 to-transparent rounded-full" />
            </div>
            {!isEditing && (
              <Button 
                onClick={() => setIsEditing(true)} 
                className="h-12 px-6 bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/50 transition-all rounded-lg font-semibold"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl opacity-50" />
            <div className="relative bg-card/80 backdrop-blur-sm border border-primary/20 p-6 sm:p-8 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Edit Profile</h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
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
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Profile Card */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl opacity-50" />
                <div className="relative bg-card/80 backdrop-blur-sm border border-primary/20 p-8 rounded-2xl shadow-xl">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <Building2 className="w-6 h-6 text-primary" />
                      Venue Details
                    </h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-primary via-primary/40 to-transparent rounded-full" />
                  </div>

                  <div className="space-y-6">
                    {/* Venue Name */}
                    <div className="p-4 rounded-lg bg-primary/10 transition-colors">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-2">Venue Name</p>
                      <p className="text-2xl font-bold text-foreground">{profile?.venueName}</p>
                    </div>

                    {/* Venue Type */}
                    {profile?.venueType && (
                      <div className="p-4 rounded-lg bg-primary/10 transition-colors">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-2">Venue Type</p>
                        <p className="text-lg font-semibold text-foreground">{profile.venueType}</p>
                      </div>
                    )}

                    {/* Location */}
                    <div className="p-4 rounded-lg bg-primary/10">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-xs uppercase tracking-wide text-foreground/60 font-semibold mb-1">Location</p>
                          <p className="text-lg font-semibold text-foreground">{profile?.location}</p>
                        </div>
                      </div>
                    </div>

                    {/* Capacity */}
                    {profile?.capacity && (
                      <div className="p-4 rounded-lg bg-primary/10">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="text-xs uppercase tracking-wide text-foreground/60 font-semibold mb-1">Capacity</p>
                            <p className="text-2xl font-bold text-foreground">{profile.capacity} <span className="text-sm text-foreground/60">people</span></p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    <div className="p-4 rounded-lg border-secondary/50 border">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-3">Description</p>
                      <p className="text-foreground/80 leading-relaxed">{profile?.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl opacity-50" />
                <div className="relative bg-gradient-to-br from-primary to-primary/80 p-6 rounded-2xl shadow-xl text-foreground">
                  <div className="text-center">
                    <Building2 className="w-8 h-8 mx-auto mb-3 text-foreground/90" />
                    <p className="text-sm text-foreground/80 mb-2">Your Venue Profile is</p>
                    <p className="text-3xl font-bold">Active</p>
                    <p className="text-xs text-foreground/70 mt-3">Ready to book artists!</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl opacity-50" />
                <div className="relative bg-card/80 backdrop-blur-sm border border-primary/20 p-6 rounded-2xl shadow-xl">
                  <h4 className="font-semibold text-foreground mb-4">Quick Info</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Media Files</span>
                      <span className="font-semibold text-foreground">{profile?.mediaUrls?.length || 0}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Profile Status</span>
                      <span className="font-semibold text-primary">Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Media Gallery Card */}
        {!isEditing && (
          <div className="mt-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl opacity-50" />
            <div className="relative bg-card/80 backdrop-blur-sm border border-primary/20 p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Media Gallery
              </h3>
              {profile?.mediaUrls && profile.mediaUrls.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {profile.mediaUrls.map((url, index) => (
                    <div 
                      key={index} 
                      className="aspect-square bg-muted rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer"
                    >
                      {url.includes("video") ? (
                        <video 
                          src={url} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                          controls 
                        />
                      ) : (
                        <img
                          src={url}
                          alt={`Media ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Building2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">No media uploaded yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Actions Card */}
        {!isEditing && (
          <div className="mt-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl opacity-50" />
            <div className="relative bg-card/80 backdrop-blur-sm border border-primary/20 p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                Quick Actions
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link href="/artists" className="w-full">
                  <Button className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/50 transition-all rounded-lg font-semibold">
                    <Building2 className="w-4 h-4 mr-2" />
                    Browse Artists
                  </Button>
                </Link>
                <Link href="/dashboard/bookings" className="w-full">
                  <Button variant="outline" className="w-full h-12 rounded-lg font-semibold">
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
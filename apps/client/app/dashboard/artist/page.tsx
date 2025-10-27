"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchMyArtistProfile,
  createArtistProfile,
  updateArtistProfile,
} from "@/store/slices/artistSlice";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProfileForm from "@/components/profile/ProfileForm";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { CreateArtistData, CreateVenueData } from "@/types";
import { toast } from "react-hot-toast";
import { Edit, MapPin, Music, X } from "lucide-react";
import Image from "next/image";

export default function ArtistDashboardPage() {
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((state) => state.artist);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchMyArtistProfile());
  }, [dispatch]);

  const handleCreateProfile = async (data: CreateArtistData | CreateVenueData) => {
    const artistData = data as CreateArtistData;
    const result = await dispatch(createArtistProfile(artistData));
    if (createArtistProfile.fulfilled.match(result)) {
      toast.success("Profile created successfully!");
      setIsEditing(false);
    } else if (createArtistProfile.rejected.match(result)) {
      toast.error("Failed to create profile. Please try again.");
    }
  };

  const handleUpdateProfile = async (data: CreateArtistData | CreateVenueData) => {
    if (!profile) return;
    const artistData = data as CreateArtistData;
    const result = await dispatch(updateArtistProfile({ id: profile.id, data: artistData }));
    if (updateArtistProfile.fulfilled.match(result)) {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } else if (updateArtistProfile.rejected.match(result)) {
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
                <Music className="text-foreground h-8 w-8" />
              </div>
              <h1 className="heading">Create Your Artist Profile</h1>
              <p className="text-foreground/70">
                Set up your profile to start receiving booking requests from venues.
              </p>
              <div className="from-primary to-primary/40 mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r" />
            </div>
          </div>

          <div className="relative">
            <div className="from-primary/20 to-primary/5 absolute inset-0 rounded-2xl bg-gradient-to-br opacity-50 blur-xl" />
            <div className="bg-card/80 border-primary/20 relative rounded-2xl border p-6 shadow-xl backdrop-blur-sm sm:p-8">
              <h2 className="text-foreground mb-6 text-2xl font-bold">Artist Information</h2>
              <ProfileForm role="ARTIST" onSubmit={handleCreateProfile} loading={loading} />
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
              <h1 className="heading">My Artist Profile</h1>
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
                role="ARTIST"
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
                      <Music className="text-primary h-6 w-6" />
                      Artist Details
                    </h3>
                    <div className="from-primary via-primary/40 h-1 w-20 rounded-full bg-gradient-to-r to-transparent" />
                  </div>

                  <div className="space-y-6">
                    {/* Artist Type */}
                    <div className="bg-primary/10 rounded-lg p-4">
                      <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
                        Artist Type
                      </p>
                      <p className="text-foreground text-xl font-bold">{profile?.artistType}</p>
                    </div>

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

                    {/* Price Per Gig */}
                    <div className="bg-primary/10 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-foreground/60 mb-1 text-xs font-semibold tracking-wide uppercase">
                            Price Per Gig
                          </p>
                          <p className="text-foreground text-2xl font-bold">
                            $ {profile?.pricePerGig}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="border-secondary/50 rounded-lg border p-4">
                      <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wide uppercase">
                        Bio
                      </p>
                      <p className="text-foreground/80 leading-relaxed">{profile?.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              <div className="relative">
                <div className="from-primary to-primary/80 text-foreground relative rounded-2xl bg-gradient-to-br p-6 shadow-xl">
                  <div className="text-center">
                    <Music className="text-foreground/90 mx-auto mb-3 h-8 w-8" />
                    <p className="text-foreground/80 mb-2 text-sm">Your Artist Profile is</p>
                    <p className="text-3xl font-bold">Active</p>
                    <p className="text-foreground/70 mt-3 text-xs">Ready to receive bookings!</p>
                  </div>
                </div>
              </div>

              <div className="relative">
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
            <div className="bg-card/80 border-primary/20 relative rounded-2xl border p-8 shadow-xl backdrop-blur-sm">
              <h3 className="text-foreground mb-6 flex items-center gap-2 text-2xl font-bold">
                <Music className="text-primary h-6 w-6" />
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
                          width={400}
                          height={400}
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
                  <Music className="text-muted-foreground/30 mx-auto mb-3 h-12 w-12" />
                  <p className="text-muted-foreground">No media uploaded yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

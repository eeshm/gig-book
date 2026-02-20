"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const dispatch = useAppDispatch();
  // Select auth state to check if properly authenticated
  const authUser = useAppSelector((state) => state.auth.user);
  const authLoading = useAppSelector((state) => state.auth.loading);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  // Only select what we need to minimize rerenders
  const profile = useAppSelector((state) => state.artist.profile);
  const loading = useAppSelector((state) => state.artist.loading);
  const [isEditing, setIsEditing] = useState(false);
  const hasFetchedRef = useRef(false);
  const [hasRedirected, setHasRedirected] = useState(false);

  // Redirect if user logs out while on this page
  useEffect(() => {
    // If auth has finished loading and user is not authenticated, redirect to login
    if (!authLoading && !isAuthenticated && !hasRedirected) {
      setHasRedirected(true);
      router.replace("/login");
    }
  }, [isAuthenticated, authLoading, router, hasRedirected]);

  // If not authenticated, don't render anything - user will be redirected
  if (!isAuthenticated && !authLoading) {
    return null;
  }

  useEffect(() => {
    // Only fetch profile once when auth is ready AND user is ARTIST role
    if (
      !profile &&
      !loading &&
      !hasFetchedRef.current &&
      authUser &&
      !authLoading &&
      authUser.role === "ARTIST"
    ) {
      hasFetchedRef.current = true;
      dispatch(fetchMyArtistProfile());
    }
  }, [authUser, authLoading, profile, loading, dispatch]);
  const handleCreateProfile = useCallback(
    async (data: CreateArtistData | CreateVenueData) => {
      const artistData = data as CreateArtistData;
      const result = await dispatch(createArtistProfile(artistData));
      if (createArtistProfile.fulfilled.match(result)) {
        toast.success("Profile created successfully!");
        setIsEditing(false);
      } else if (createArtistProfile.rejected.match(result)) {
        toast.error("Failed to create profile. Please try again.");
      }
    },
    [dispatch]
  );

  const handleUpdateProfile = useCallback(
    async (data: CreateArtistData | CreateVenueData) => {
      if (!profile) return;
      const artistData = data as CreateArtistData;
      const result = await dispatch(updateArtistProfile({ id: profile.id, data: artistData }));
      if (updateArtistProfile.fulfilled.match(result)) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else if (updateArtistProfile.rejected.match(result)) {
        toast.error("Failed to update profile. Please try again.");
      }
    },
    [dispatch, profile]
  );

  // Determine whether auth and fetch state are ready. While auth is resolving
  // or we haven't yet attempted to fetch the profile, show a loading state
  // to avoid briefly rendering the "create profile" form on refresh.
  const authReady = !!authUser && !authLoading;
  const fetchAttempted = hasFetchedRef.current;

  if (authLoading || (authReady && !fetchAttempted) || (loading && !profile)) {
    return (
      <DashboardLayout>
        <LoadingSpinner size="lg" text="Loading your profile..." />
      </DashboardLayout>
    );
  }

  // No profile exists - Show create form (only after we've attempted fetching)
  if (!profile && !loading && fetchAttempted) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <p className="font-[family-name:var(--font-family-oswald)] mb-1 text-xs tracking-widest text-muted-foreground uppercase">
              Setup
            </p>
            <h1 className="font-[family-name:var(--font-family-oswald)] text-3xl font-bold tracking-wide text-foreground uppercase">
              Create Your Artist Profile
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Set up your profile to start receiving booking requests from venues.
            </p>
            <div className="mt-4 h-px bg-gradient-to-r from-amber-400/60 to-transparent" />
          </div>
          <div className="border-border/40 bg-card rounded-xl border p-6 sm:p-8">
            <h2 className="font-[family-name:var(--font-family-oswald)] mb-6 text-lg font-semibold tracking-wide text-foreground uppercase">
              Artist Information
            </h2>
            <ProfileForm role="ARTIST" onSubmit={handleCreateProfile} loading={loading} />
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
              <p className="font-[family-name:var(--font-family-oswald)] mb-1 text-xs tracking-widest text-muted-foreground uppercase">
                Artist Dashboard
              </p>
              <h1 className="font-[family-name:var(--font-family-oswald)] text-3xl font-bold tracking-wide text-foreground uppercase sm:text-4xl">
                My Profile
              </h1>
              <div className="mt-3 h-px w-48 bg-gradient-to-r from-amber-400/60 to-transparent" />
            </div>
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="border-amber-400/40 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20 h-10 rounded-lg border px-5 text-sm font-medium transition-all"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="border-border/40 bg-card rounded-xl border p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-[family-name:var(--font-family-oswald)] text-lg font-semibold tracking-wide text-foreground uppercase">
                Edit Profile
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="hover:bg-muted rounded-lg p-2 transition-colors"
              >
                <X className="text-muted-foreground h-4 w-4" />
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
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Profile Card */}
            <div className="lg:col-span-2">
              <div className="border-border/40 bg-card rounded-xl border">
                <div className="border-border/20 flex items-center gap-3 border-b px-6 py-4">
                  <Music className="h-4 w-4 text-amber-400" />
                  <h3 className="font-[family-name:var(--font-family-oswald)] text-sm font-semibold tracking-widest text-foreground uppercase">
                    Artist Details
                  </h3>
                </div>
                <div className="divide-border/20 divide-y">
                  <div className="flex items-center justify-between px-6 py-4">
                    <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Artist Type</span>
                    <span className="font-[family-name:var(--font-family-oswald)] text-base font-semibold text-foreground">
                      {profile?.artistType}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4">
                    <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Location</span>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-amber-400/70" />
                      <span className="text-sm font-medium text-foreground">{profile?.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4">
                    <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Price Per Gig</span>
                    <span className="font-mono text-xl font-bold text-amber-400">${profile?.pricePerGig}</span>
                  </div>
                  <div className="px-6 py-4">
                    <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">Bio</p>
                    <p className="text-sm leading-relaxed text-foreground/80">{profile?.bio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-4">
              <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
                  <span className="font-[family-name:var(--font-family-oswald)] text-xs tracking-widest text-amber-400 uppercase">
                    Active
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Your artist profile is live and ready to receive booking requests.
                </p>
              </div>
              <div className="border-border/40 bg-card rounded-xl border p-5">
                <h4 className="font-[family-name:var(--font-family-oswald)] mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  Quick Stats
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Media Files</span>
                    <span className="font-mono font-bold text-foreground">{profile?.mediaUrls?.length || 0}</span>
                  </div>
                  <div className="border-border/20 border-t pt-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Profile Status</span>
                      <span className="font-medium text-amber-400">Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Media Gallery */}
        {!isEditing && (
          <div className="border-border/40 bg-card mt-6 rounded-xl border">
            <div className="border-border/20 flex items-center gap-3 border-b px-6 py-4">
              <Music className="h-4 w-4 text-amber-400" />
              <h3 className="font-[family-name:var(--font-family-oswald)] text-sm font-semibold tracking-widest text-foreground uppercase">
                Media Gallery
              </h3>
              {profile?.mediaUrls && profile.mediaUrls.length > 0 && (
                <span className="font-mono ml-auto text-xs text-muted-foreground">
                  {profile.mediaUrls.length} files
                </span>
              )}
            </div>
            <div className="p-6">
              {profile?.mediaUrls && profile.mediaUrls.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                  {profile.mediaUrls.map((url, index) => (
                    <div
                      key={index}
                      className="bg-muted group aspect-square cursor-pointer overflow-hidden rounded-lg transition-all hover:shadow-lg"
                    >
                      {url.includes("video") ? (
                        <video
                          src={url}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          controls
                        />
                      ) : (
                        <Image
                          width={800}
                          height={400}
                          src={url}
                          alt={`Media ${index + 1}`}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center">
                  <Music className="text-muted-foreground/20 mx-auto mb-3 h-10 w-10" />
                  <p className="text-sm text-muted-foreground">No media uploaded yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

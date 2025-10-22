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
import MediaUploader from "@/components/media/MediaUploader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { CreateArtistData, CreateVenueData } from "@/types";
import { toast } from "react-hot-toast";
import { UserCircle, Edit, DollarSign, MapPin, IndianRupee } from "lucide-react";

export default function ArtistDashboardPage() {
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((state) => state.artist);
  const [isEditing, setIsEditing] = useState(false);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchMyArtistProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.mediaUrls) {
      setMediaUrls(profile.mediaUrls);
    }
  }, [profile]);

  const handleCreateProfile = async (data: CreateArtistData | CreateVenueData) => {
    const artistData = data as CreateArtistData;
    const result = await dispatch(
      createArtistProfile({ ...artistData, mediaUrls })
    );
    if (createArtistProfile.fulfilled.match(result)) {
      toast.success("Profile created successfully!");
      // Profile is already set in state from the create response
      setIsEditing(false);
    } else if (createArtistProfile.rejected.match(result)) {
      toast.error("Failed to create profile. Please try again.");
    }
  };

  const handleUpdateProfile = async (data: CreateArtistData | CreateVenueData) => {
    if (!profile) return;
    const artistData = data as CreateArtistData;
    const result = await dispatch(
      updateArtistProfile({ id: profile.id, data: { ...artistData, mediaUrls } })
    );
    if (updateArtistProfile.fulfilled.match(result)) {
      toast.success("Profile updated successfully!");
      // Profile is already updated in state from the update response
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
        <div className="max-w-2xl mx-auto">
          <EmptyState
            icon={UserCircle}
            title="Create Your Artist Profile"
            description="Set up your profile to start receiving booking requests from venues."
            actionLabel=""
          />
          <div className="bg-card p-4 sm:p-6 lg:p-8 rounded-xl border border-border shadow-lg mt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Artist Information</h2>
            <ProfileForm
              role="ARTIST"
              onSubmit={handleCreateProfile}
              loading={loading}
            />

            <div className="mt-6 sm:mt-8">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Media Gallery</h3>
              <MediaUploader mediaUrls={mediaUrls} onUploadComplete={setMediaUrls} />
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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Profile</h1>
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
              role="ARTIST"
              initialData={profile}
              onSubmit={handleUpdateProfile}
              loading={loading}
            />

            <div className="mt-6 sm:mt-8">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Media Gallery</h3>
              <MediaUploader mediaUrls={mediaUrls} onUploadComplete={setMediaUrls} />
            </div>

            <Button
              variant="outline"
              className="mt-6 w-full sm:w-auto"
              onClick={() => {
                setIsEditing(false);
                setMediaUrls(profile?.mediaUrls || []);
              }}
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
                  <p className="text-sm text-muted-foreground mb-1">Artist Type</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">{profile?.artistType}</p>
                </div>

                <div className="flex items-center space-x-2 text-muted-foreground text-sm sm:text-base">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{profile?.location}</span>
                </div>

                <div className="flex items-center space-x-2 text-muted-foreground text-sm sm:text-base">
                  <IndianRupee className="w-4 h-4 flex-shrink-0"/>
                  <span>{profile?.pricePerGig} per gig</span>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Bio</p>
                  <p className="text-sm sm:text-base text-foreground">{profile?.bio}</p>
                </div>
              </div>
            </div>

            {/* Media Gallery Card */}
            <div className="bg-card p-4 sm:p-6 lg:p-8 rounded-xl border border-border shadow-lg">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Media Gallery</h3>
              {profile?.mediaUrls && profile.mediaUrls.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                  {profile.mediaUrls.map((url, index) => (
                    <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden">
                      {url.includes("video") ? (
                        <video src={url} className="w-full h-full object-cover" controls />
                      ) : (
                        <img
                          src={url}
                          alt={`Media ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm sm:text-base text-muted-foreground">No media uploaded yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
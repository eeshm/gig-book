"use client";

import { useState, useEffect, useId } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface MediaUploaderProps {
  mediaUrls: string[];
  onUploadComplete: (urls: string[]) => void;
  maxFiles?: number;
}

export default function MediaUploader({
  mediaUrls,
  onUploadComplete,
  maxFiles = 5,
}: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [localUrls, setLocalUrls] = useState<string[]>(mediaUrls);
  const [error, setError] = useState<string | null>(null);
  const inputId = useId();

  // Sync localUrls when mediaUrls prop changes
  useEffect(() => {
    setLocalUrls(mediaUrls);
  }, [mediaUrls]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (localUrls.length + files.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} files`);
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Validate file types
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/quicktime",
    ];
    const invalidFiles = Array.from(files).filter((file) => !validTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      setError("Please upload only images (JPEG, PNG, GIF, WebP) or videos (MP4, MOV)");
      setTimeout(() => setError(null), 3000);
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
      console.log("Cloudinary Config:", { cloudName, uploadPreset });

      if (!cloudName || !uploadPreset) {
        throw new Error(
          "Cloudinary configuration is missing. Please set up environment variables."
        );
      }

      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`Upload failed: ${res.statusText}`);
        }

        const data = await res.json();
        return data.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const newUrls = [...localUrls, ...uploadedUrls];
      setLocalUrls(newUrls);
      onUploadComplete(newUrls);
      setError(null);
    } catch (error) {
      console.error("Upload error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to upload media. Please try again."
      );
    } finally {
      setUploading(false);
      // Reset the file input
      e.target.value = "";
    }
  };

  const handleRemove = (urlToRemove: string) => {
    const newUrls = localUrls.filter((url) => url !== urlToRemove);
    setLocalUrls(newUrls);
    onUploadComplete(newUrls);
  };

  return (
    <div className="space-y-4">
      {/* Error Message */}
      {error && (
        <div className="bg-destructive/10 border-destructive/30 text-destructive rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Upload Button */}
      <div>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleUpload}
          disabled={uploading || localUrls.length >= maxFiles}
          className="hidden"
          id={inputId}
        />
        <label htmlFor={inputId}>
          <Button
            type="button"
            variant="outline"
            disabled={uploading || localUrls.length >= maxFiles}
            asChild
          >
            <span className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? "Uploading..." : "Upload Media"}
            </span>
          </Button>
        </label>
        <p className="text-muted-foreground mt-2 text-xs">
          Upload up to {maxFiles} images or videos ({localUrls.length}/{maxFiles})
        </p>
      </div>

      {/* Media Grid */}
      {localUrls.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {localUrls.map((url, index) => (
            <div key={index} className="group relative">
              <div className="bg-muted aspect-square overflow-hidden rounded-lg">
                {url.includes("video") ? (
                  <video src={url} className="h-full w-full object-cover" />
                ) : (
                  <img
                    src={url}
                    alt={`Media ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 transition group-hover:opacity-100"
                onClick={() => handleRemove(url)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {localUrls.length === 0 && (
        <div className="border-border rounded-lg border-2 border-dashed p-8 text-center">
          <ImageIcon className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
          <p className="text-muted-foreground text-sm">No media uploaded yet</p>
        </div>
      )}
    </div>
  );
}

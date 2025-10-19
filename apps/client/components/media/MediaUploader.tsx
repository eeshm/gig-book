"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "react-hot-toast";

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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (localUrls.length + files.length > maxFiles) {
      toast.error(`You can only upload up to ${maxFiles} files`);
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        return data.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const newUrls = [...localUrls, ...uploadedUrls];
      setLocalUrls(newUrls);
      onUploadComplete(newUrls);
      toast.success("Media uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload media");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (urlToRemove: string) => {
    const newUrls = localUrls.filter((url) => url !== urlToRemove);
    setLocalUrls(newUrls);
    onUploadComplete(newUrls);
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleUpload}
          disabled={uploading || localUrls.length >= maxFiles}
          className="hidden"
          id="media-upload"
        />
        <label htmlFor="media-upload">
          <Button
            type="button"
            variant="outline"
            disabled={uploading || localUrls.length >= maxFiles}
            asChild
          >
            <span className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "Uploading..." : "Upload Media"}
            </span>
          </Button>
        </label>
        <p className="text-xs text-muted-foreground mt-2">
          Upload up to {maxFiles} images or videos ({localUrls.length}/{maxFiles})
        </p>
      </div>

      {/* Media Grid */}
      {localUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {localUrls.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                {url.includes("video") ? (
                  <video src={url} className="w-full h-full object-cover" />
                ) : (
                  <img
                    src={url}
                    alt={`Media ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
                onClick={() => handleRemove(url)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {localUrls.length === 0 && (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">No media uploaded yet</p>
        </div>
      )}
    </div>
  );
}
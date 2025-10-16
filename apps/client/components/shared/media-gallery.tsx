// components/shared/media-gallery.tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface MediaGalleryProps {
  mediaUrls: string[];
  onDelete?: (url: string) => void;
  editable?: boolean;
}

export function MediaGallery({ mediaUrls, onDelete, editable = false }: MediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!mediaUrls || mediaUrls.length === 0) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-8 text-center">
        <p className="text-slate-400">No media uploaded yet</p>
      </div>
    );
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? mediaUrls.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === mediaUrls.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const handleLightboxPrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? mediaUrls.length - 1 : prev - 1));
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prev) => (prev === mediaUrls.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-6">
      {/* Carousel Section */}
      <div className="relative overflow-hidden rounded-lg bg-slate-900">
        <div className="relative aspect-video">
          <img
            src={mediaUrls[currentIndex]}
            alt={`Media ${currentIndex + 1}`}
            className="h-full w-full object-cover"
          />
          
          {/* Navigation Arrows */}
          {mediaUrls.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-black/70"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-black/70"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">
            {currentIndex + 1} / {mediaUrls.length}
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {mediaUrls.map((url, index) => (
          <div
            key={index}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg border border-slate-700 bg-slate-800"
            onClick={() => openLightbox(index)}
          >
            <img
              src={url}
              alt={`Thumbnail ${index + 1}`}
              className="h-full w-full object-cover transition group-hover:scale-110"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/40" />

            {/* Delete button (if editable) */}
            {editable && onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(url);
                }}
                className="absolute right-2 top-2 rounded-full bg-red-600 p-1.5 text-white opacity-0 transition hover:bg-red-700 group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}

            {/* Active indicator */}
            {index === currentIndex && (
              <div className="absolute inset-0 border-4 border-blue-500" />
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative h-full w-full max-w-6xl p-4">
            <img
              src={mediaUrls[lightboxIndex]}
              alt={`Media ${lightboxIndex + 1}`}
              className="h-full w-full object-contain"
            />

            {/* Lightbox Navigation */}
            {mediaUrls.length > 1 && (
              <>
                <button
                  onClick={handleLightboxPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={handleLightboxNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            {/* Lightbox Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-white backdrop-blur-sm">
              {lightboxIndex + 1} / {mediaUrls.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
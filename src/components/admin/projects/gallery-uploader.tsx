"use client";

import * as React from "react";
import Image from "next/image";
import { UploadCloud, X, Images, AlertCircle, Loader2 } from "lucide-react";
import { uploadMultipleImages, MAX_UPLOAD_SIZE_BYTES } from "@/services/admin.service";

export interface GalleryUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  disabled?: boolean;
}

export function GalleryUploader({
  value = [],
  onChange,
  disabled = false,
}: GalleryUploaderProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [manualUrl, setManualUrl] = React.useState("");
  const [showManualInput, setShowManualInput] = React.useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFilesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setError(null);
    const files = Array.from(fileList);

    if (files.length > 10) {
      setError("You can upload a maximum of 10 gallery images in one batch.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    for (const f of files) {
      if (f.size > MAX_UPLOAD_SIZE_BYTES) {
        setError(`File "${f.name}" exceeds the 10 MB limit.`);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }
    }

    setIsUploading(true);
    try {
      const results = await uploadMultipleImages(files);
      const newUrls = results.map((r) => r.url || r.displayUrl).filter(Boolean);
      onChange([...value, ...newUrls]);
    } catch (err) {
      console.error("[GalleryUploader] Batch upload error:", err);
      setError(err instanceof Error ? err.message : "Failed to upload gallery images.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleAddManualUrl = () => {
    const trimmed = manualUrl.trim();
    if (trimmed && (trimmed.startsWith("http://") || trimmed.startsWith("https://"))) {
      if (!value.includes(trimmed)) {
        onChange([...value, trimmed]);
      }
      setManualUrl("");
      setShowManualInput(false);
    } else {
      setError("Please provide a valid image URL starting with http:// or https://");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Images className="w-3.5 h-3.5 text-cyan-400" />
          <span>Project Gallery ({value.length})</span>
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowManualInput(!showManualInput)}
            className="text-[11px] text-violet-400 hover:text-violet-300 font-medium transition-colors"
          >
            {showManualInput ? "Hide URL input" : "+ Add image via URL"}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Optional Manual URL Input */}
      {showManualInput && (
        <div className="flex gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
          <input
            type="url"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://example.com/gallery-image.jpg"
            className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500 font-mono"
          />
          <button
            type="button"
            onClick={handleAddManualUrl}
            className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors"
          >
            Add URL
          </button>
        </div>
      )}

      {/* Gallery Image Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {value.map((url, idx) => (
            <div
              key={idx}
              className="group relative h-24 rounded-xl overflow-hidden bg-black/40 border border-white/10"
            >
              <Image
                src={url}
                alt={`Gallery image ${idx + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 640px) 50vw, 150px"
                unoptimized={url.startsWith("http")}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                disabled={disabled || isUploading}
                className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-black/70 hover:bg-rose-600 text-white transition-colors opacity-90 sm:opacity-0 group-hover:opacity-100"
                title="Remove image from gallery"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <span className="absolute bottom-1 left-1.5 text-[9px] font-mono text-white/80 bg-black/60 px-1 rounded">
                #{idx + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <button
        type="button"
        onClick={() => !isUploading && !disabled && fileInputRef.current?.click()}
        disabled={isUploading || disabled}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-dashed border-white/15 hover:border-violet-500/40 bg-white/[0.02] hover:bg-white/[0.04] text-xs font-medium text-slate-300 hover:text-white transition-all disabled:opacity-50"
      >
        {isUploading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
            <span>Uploading gallery images to ImgBB...</span>
          </>
        ) : (
          <>
            <UploadCloud className="w-4 h-4 text-violet-400" />
            <span>Upload Gallery Images (Select multiple files)</span>
          </>
        )}
      </button>

      {/* Hidden Multiple File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFilesSelect}
        className="hidden"
        disabled={isUploading || disabled}
      />
    </div>
  );
}

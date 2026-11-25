"use client";

import * as React from "react";
import Image from "next/image";
import { UploadCloud, X, RefreshCw, AlertCircle, ImageIcon } from "lucide-react";
import { uploadSingleImage, MAX_UPLOAD_SIZE_BYTES } from "@/services/admin.service";

export interface ThumbnailUploaderProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export function ThumbnailUploader({
  value,
  onChange,
  disabled = false,
}: ThumbnailUploaderProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate size client-side
    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
      setError(`File size exceeds 10 MB limit (${(file.size / (1024 * 1024)).toFixed(2)} MB).`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploading(true);
    try {
      const result = await uploadSingleImage(file);
      onChange(result.url || result.displayUrl);
    } catch (err) {
      console.error("[ThumbnailUploader] Upload error:", err);
      setError(err instanceof Error ? err.message : "Failed to upload thumbnail.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    onChange("");
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>Project Thumbnail *</span>
        </label>
        <span className="text-[10px] text-slate-400">
          JPG, PNG or WEBP (Max 10 MB)
        </span>
      </div>

      {error && (
        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {value ? (
        // Thumbnail Preview with Replace and Remove actions
        <div className="relative group rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex flex-col sm:flex-row items-center gap-4 p-3.5">
          <div className="relative w-full sm:w-44 h-28 rounded-xl overflow-hidden bg-black/40 border border-white/10 flex-shrink-0">
            <Image
              src={value}
              alt="Project thumbnail preview"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 176px"
              unoptimized={value.startsWith("http")}
            />
          </div>

          <div className="flex-1 min-w-0 space-y-1.5 w-full text-left">
            <p className="text-xs font-semibold text-white truncate">
              Thumbnail Configured
            </p>
            <p className="text-[11px] font-mono text-cyan-300 truncate max-w-sm">
              {value}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading || disabled}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white text-xs font-medium border border-white/10 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isUploading ? "animate-spin" : ""}`} />
                <span>Replace</span>
              </button>

              <button
                type="button"
                onClick={handleRemove}
                disabled={isUploading || disabled}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-medium border border-rose-500/20 transition-colors disabled:opacity-50"
              >
                <X className="w-3 h-3" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Dropzone / File Picker
        <div
          onClick={() => !isUploading && !disabled && fileInputRef.current?.click()}
          className={`border-2 border-dashed border-white/15 hover:border-violet-500/50 rounded-2xl p-6 text-center transition-all cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] ${
            isUploading ? "pointer-events-none opacity-60" : ""
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              {isUploading ? (
                <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
              ) : (
                <UploadCloud className="w-6 h-6" />
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-white">
                {isUploading ? "Uploading to ImgBB..." : "Click to upload project thumbnail"}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Processed securely through authenticated portfolio backend
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading || disabled}
      />
    </div>
  );
}

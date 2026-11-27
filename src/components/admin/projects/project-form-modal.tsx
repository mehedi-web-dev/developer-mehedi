"use client";

import * as React from "react";
import {
  X,
  Plus,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Globe,
  Calendar,
  Layers,
  ImageIcon,
  FileText,
  Cpu,
  Settings,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { ThumbnailUploader } from "./thumbnail-uploader";
import { GalleryUploader } from "./gallery-uploader";
import type { ProjectItem } from "@/types";
import type { CreateProjectInput, UpdateProjectInput } from "@/services/admin.service";

export interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProjectInput | UpdateProjectInput) => Promise<void>;
  initialData?: ProjectItem | null;
  existingCategories?: string[];
  isSubmitting: boolean;
}

const DEFAULT_CATEGORIES = [
  "WordPress & Elementor",
  "Full-Stack Web Development",
  "Frontend Engineering",
  "WooCommerce & E-Commerce",
  "React & Next.js",
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDateForInput(dateVal?: string | Date | null): string {
  if (!dateVal) return "";
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

interface ProjectFormContentProps {
  initialData?: ProjectItem | null;
  existingCategories?: string[];
  onClose: () => void;
  onSubmit: (data: CreateProjectInput | UpdateProjectInput) => Promise<void>;
  isSubmitting: boolean;
}

function ProjectFormContent({
  initialData,
  existingCategories = [],
  onClose,
  onSubmit,
  isSubmitting,
}: ProjectFormContentProps) {
  const isEditing = Boolean(initialData);

  // Form State initialized directly from initialData
  const [title, setTitle] = React.useState(initialData?.title || "");
  const [slug, setSlug] = React.useState(initialData?.slug || "");
  const [category, setCategory] = React.useState(
    initialData?.category || DEFAULT_CATEGORIES[0]
  );
  const [shortDescription, setShortDescription] = React.useState(
    initialData?.shortDescription || ""
  );
  const [description, setDescription] = React.useState(
    initialData?.description || ""
  );
  const [thumbnail, setThumbnail] = React.useState(initialData?.thumbnail || "");
  const [gallery, setGallery] = React.useState<string[]>(
    Array.isArray(initialData?.gallery) ? [...initialData.gallery] : []
  );
  const [technologies, setTechnologies] = React.useState<string[]>(
    Array.isArray(initialData?.technologies) ? [...initialData.technologies] : []
  );
  const [techInput, setTechInput] = React.useState("");
  const [liveUrl, setLiveUrl] = React.useState(initialData?.liveUrl || "");
  const [githubUrl, setGithubUrl] = React.useState(initialData?.githubUrl || "");
  const [completionDate, setCompletionDate] = React.useState(
    formatDateForInput(initialData?.completionDate)
  );
  const [order, setOrder] = React.useState(initialData?.order ?? 0);
  const [published, setPublished] = React.useState(initialData?.published ?? true);
  const [featured, setFeatured] = React.useState(initialData?.featured ?? false);

  const [formError, setFormError] = React.useState<string | null>(null);

  const categories = React.useMemo(() => {
    const combined = Array.from(new Set([...DEFAULT_CATEGORIES, ...existingCategories]));
    return combined;
  }, [existingCategories]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditing) {
      setSlug(slugify(val));
    }
  };

  const handleAddTech = () => {
    const val = techInput.trim();
    if (!val) return;
    const parts = val.includes(",")
      ? val.split(",").map((s) => s.trim()).filter(Boolean)
      : [val];
    const newItems = parts.filter((p) => !technologies.includes(p));
    if (newItems.length > 0) {
      setTechnologies([...technologies, ...newItems]);
      setTechInput("");
    }
  };

  const handleRemoveTech = (index: number) => {
    setTechnologies(technologies.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError("Project title is required.");
      return;
    }
    if (title.length > 200) {
      setFormError("Project title cannot exceed 200 characters.");
      return;
    }
    if (!category.trim()) {
      setFormError("Project category is required.");
      return;
    }
    if (!shortDescription.trim()) {
      setFormError("Short description is required.");
      return;
    }
    if (shortDescription.length > 300) {
      setFormError("Short description cannot exceed 300 characters.");
      return;
    }
    if (!description.trim()) {
      setFormError("Detailed description is required.");
      return;
    }
    if (!thumbnail.trim()) {
      setFormError("Please upload a thumbnail image for the project.");
      return;
    }

    // Validate optional Live Website URL
    if (liveUrl.trim()) {
      try {
        const parsed = new URL(liveUrl.trim());
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
          setFormError("Live Website URL must begin with http:// or https://");
          return;
        }
      } catch {
        setFormError("Please enter a valid Live Website URL (e.g. https://example.com).");
        return;
      }
    }

    // Validate optional GitHub Repository URL
    if (githubUrl.trim()) {
      try {
        const parsed = new URL(githubUrl.trim());
        if (parsed.protocol !== "https:") {
          setFormError("GitHub Repository URL must use secure https:// protocol.");
          return;
        }
        const hostname = parsed.hostname.toLowerCase();
        if (hostname !== "github.com" && hostname !== "www.github.com") {
          setFormError(
            "GitHub Repository URL must point to github.com (e.g. https://github.com/username/repo)."
          );
          return;
        }
      } catch {
        setFormError(
          "Please enter a valid GitHub Repository URL (e.g. https://github.com/username/repo)."
        );
        return;
      }
    }

    const payload: CreateProjectInput = {
      title: title.trim(),
      slug: slug.trim() ? slugify(slug) : slugify(title),
      category: category.trim(),
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      thumbnail: thumbnail.trim(),
      gallery,
      technologies,
      liveUrl: liveUrl.trim(),
      githubUrl: githubUrl.trim(),
      completionDate: completionDate ? new Date(completionDate).toISOString() : null,
      order: Number(order) || 0,
      published,
      featured,
    };

    try {
      await onSubmit(payload);
      onClose();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save project.");
    }
  };

  return (
    <>
      {/* Modal Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              {isEditing ? "Edit Project" : "Create New Project"}
            </h2>
            <p className="text-xs text-slate-400">
              {isEditing
                ? "Update case study, media, tech stack, and links."
                : "Add a new verified portfolio showcase to your catalog."}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Error Banner */}
      {formError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{formError}</span>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="space-y-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <Layers className="w-4 h-4 text-violet-400" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                1. Basic Information
              </h3>
              <p className="text-[11px] text-slate-400">
                Title, URL slug, category, and completion date
              </p>
            </div>
          </div>

          {/* Title & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Project Title *</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  {title.length}/200
                </span>
              </label>
              <input
                type="text"
                required
                maxLength={200}
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. Modern E-Commerce Platform"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                placeholder="e.g. modern-e-commerce-platform"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-cyan-300 font-mono text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              />
            </div>
          </div>

          {/* Category & Completion Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Category *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. WordPress, Full-Stack"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                />
              </div>
              {/* Quick Category Suggestions */}
              <div className="flex flex-wrap gap-1 pt-1">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                      category === c
                        ? "bg-violet-600/30 text-violet-300 border border-violet-500/40"
                        : "bg-white/5 text-slate-400 border border-white/5 hover:text-white"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Completion Date</span>
              </label>
              <input
                type="date"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Project Images */}
        <div className="space-y-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                2. Project Images
              </h3>
              <p className="text-[11px] text-slate-400">
                Featured thumbnail and multiple showcase gallery images
              </p>
            </div>
          </div>

          {/* Thumbnail Image Uploader */}
          <ThumbnailUploader
            value={thumbnail}
            onChange={setThumbnail}
            disabled={isSubmitting}
          />

          {/* Gallery Images Uploader */}
          <div className="pt-2 border-t border-white/5">
            <GalleryUploader
              value={gallery}
              onChange={setGallery}
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Section 3: Project Details */}
        <div className="space-y-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <FileText className="w-4 h-4 text-amber-400" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                3. Project Details
              </h3>
              <p className="text-[11px] text-slate-400">
                Short card summary and comprehensive project case study
              </p>
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Short Description *</span>
              <span className="text-[10px] text-slate-400 font-normal">
                {shortDescription.length}/300
              </span>
            </label>
            <textarea
              required
              rows={2}
              maxLength={300}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Brief overview for cards and meta descriptions (max 300 characters)..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all resize-none"
            />
          </div>

          {/* Full Detailed Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Case Study & Detailed Description *
            </label>
            <textarea
              required
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Comprehensive description of challenge, architecture, solution, and outcomes..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
            />
          </div>
        </div>

        {/* Section 4: Technologies */}
        <div className="space-y-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                4. Technologies & Tools
              </h3>
              <p className="text-[11px] text-slate-400">
                Technologies, frameworks, libraries, and platforms utilized
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
                placeholder="Add tech (e.g. Next.js, Elementor Pro, MongoDB) and press enter..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-3.5 py-2 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition-colors"
              >
                Add
              </button>
            </div>
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(idx)}
                      className="text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 5: Project Links */}
        <div className="space-y-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <Globe className="w-4 h-4 text-cyan-400" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                5. Project Links
              </h3>
              <p className="text-[11px] text-slate-400">
                Live deployed website and source code repository links
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Live Website URL</span>
              </label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <p className="text-[10px] text-slate-400">
                Optional. Must begin with http:// or https://
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5 text-violet-400" />
                <span>GitHub Repository URL</span>
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <p className="text-[10px] text-slate-400">
                Optional. Must be a secure HTTPS GitHub link.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Publishing Settings */}
        <div className="space-y-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <Settings className="w-4 h-4 text-violet-400" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                6. Publishing Settings
              </h3>
              <p className="text-[11px] text-slate-400">
                Visibility in public portfolio catalog and homepage showcase
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Display Order
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div>
                <label className="text-xs font-semibold text-white block">
                  Published
                </label>
                <span className="text-[10px] text-slate-400 block">
                  Live in public catalog
                </span>
              </div>
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-5 h-5 rounded accent-violet-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div>
                <label className="text-xs font-semibold text-white block">
                  Featured
                </label>
                <span className="text-[10px] text-slate-400 block">
                  Show on homepage
                </span>
              </div>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-5 h-5 rounded accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-violet-500/20 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Project...</span>
              </>
            ) : isEditing ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Update Project</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Create Project</span>
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export function ProjectFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  existingCategories,
  isSubmitting,
}: ProjectFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={isSubmitting ? undefined : onClose}
        aria-hidden="true"
      />

      {/* Keyed Modal Dialog: remounts on ID change to reset state cleanly */}
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#101827] border border-white/10 shadow-2xl p-6 sm:p-8 text-slate-100 z-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <ProjectFormContent
          key={initialData?._id || "new-project"}
          initialData={initialData}
          existingCategories={existingCategories}
          onClose={onClose}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}

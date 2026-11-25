"use client";

import * as React from "react";
import {
  X,
  Plus,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import type { ServiceItem } from "@/types";
import type { CreateServiceInput, UpdateServiceInput } from "@/services/admin.service";

export interface ServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateServiceInput | UpdateServiceInput) => Promise<void>;
  initialData?: ServiceItem | null;
  isSubmitting: boolean;
}

const COMMON_ICONS = [
  "Globe",
  "Code2",
  "Smartphone",
  "Layers",
  "Palette",
  "Cpu",
  "Zap",
  "Settings",
  "Terminal",
  "Rocket",
  "Layout",
  "Database",
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface ServiceFormContentProps {
  initialData?: ServiceItem | null;
  onClose: () => void;
  onSubmit: (data: CreateServiceInput | UpdateServiceInput) => Promise<void>;
  isSubmitting: boolean;
}

function ServiceFormContent({
  initialData,
  onClose,
  onSubmit,
  isSubmitting,
}: ServiceFormContentProps) {
  const isEditing = Boolean(initialData);

  // Initialize state directly from initialData (remounted via key on modal)
  const [title, setTitle] = React.useState(initialData?.title || "");
  const [slug, setSlug] = React.useState(initialData?.slug || "");
  const [shortDescription, setShortDescription] = React.useState(initialData?.shortDescription || "");
  const [description, setDescription] = React.useState(initialData?.description || "");
  const [icon, setIcon] = React.useState(initialData?.icon || "Globe");
  const [features, setFeatures] = React.useState<string[]>(
    Array.isArray(initialData?.features) ? [...initialData.features] : []
  );
  const [featureInput, setFeatureInput] = React.useState("");
  const [technologies, setTechnologies] = React.useState<string[]>(
    Array.isArray(initialData?.technologies) ? [...initialData.technologies] : []
  );
  const [techInput, setTechInput] = React.useState("");
  const [order, setOrder] = React.useState(initialData?.order ?? 0);
  const [published, setPublished] = React.useState(initialData?.published ?? true);
  const [featured, setFeatured] = React.useState(initialData?.featured ?? false);

  const [formError, setFormError] = React.useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditing) {
      setSlug(slugify(val));
    }
  };

  const handleAddFeature = () => {
    const val = featureInput.trim();
    if (val && !features.includes(val)) {
      setFeatures([...features, val]);
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleAddTech = () => {
    const val = techInput.trim();
    if (val && !technologies.includes(val)) {
      setTechnologies([...technologies, val]);
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
      setFormError("Service title is required.");
      return;
    }
    if (title.length > 150) {
      setFormError("Title cannot exceed 150 characters.");
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

    const payload: CreateServiceInput = {
      title: title.trim(),
      slug: slug.trim() ? slugify(slug) : slugify(title),
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      icon: icon.trim(),
      features,
      technologies,
      order: Number(order) || 0,
      published,
      featured,
    };

    try {
      await onSubmit(payload);
      onClose();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save service.");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              {isEditing ? "Edit Service" : "Create New Service"}
            </h2>
            <p className="text-xs text-slate-400">
              {isEditing
                ? "Update service details, tags, and visibility."
                : "Add a new offering to your portfolio catalog."}
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

      {/* Error Notification */}
      {formError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{formError}</span>
        </div>
      )}

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title & Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Title *</span>
              <span className="text-[10px] text-slate-400 font-normal">
                {title.length}/150
              </span>
            </label>
            <input
              type="text"
              required
              maxLength={150}
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. Full-Stack Web Development"
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
              placeholder="e.g. full-stack-web-development"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-cyan-300 font-mono text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            />
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
            placeholder="Concise overview for catalog cards (max 300 characters)..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all resize-none"
          />
        </div>

        {/* Full Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">
            Detailed Description *
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Comprehensive description of process, scope, and deliverables..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
          />
        </div>

        {/* Icon Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">
            Icon Name (Lucide Icon)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="e.g. Globe, Code2, Layers"
              className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {COMMON_ICONS.map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIcon(i)}
                className={`px-2 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  icon === i
                    ? "bg-violet-600/30 text-cyan-300 border-violet-500/50"
                    : "bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10"
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">
            Key Features / Deliverables
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddFeature();
                }
              }}
              placeholder="Add a key feature and press enter..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-3.5 py-2 rounded-xl bg-violet-600/30 hover:bg-violet-600/50 text-violet-300 border border-violet-500/30 text-xs font-medium transition-colors"
            >
              Add
            </button>
          </div>
          {features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {features.map((feat, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-slate-300"
                >
                  <span>{feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Technologies */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">
            Technologies & Tools
          </label>
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
              placeholder="Add technology (e.g. Next.js, WordPress) and press enter..."
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

        {/* Order & Flags */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
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
                Visible on public site
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
                Highlight on homepage
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

        {/* Action Buttons */}
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
                <span>Saving...</span>
              </>
            ) : isEditing ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Update Service</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Create Service</span>
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export function ServiceFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: ServiceFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={isSubmitting ? undefined : onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog with Keyed Content to reset state on target change */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#101827] border border-white/10 shadow-2xl p-6 sm:p-8 text-slate-100 z-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <ServiceFormContent
          key={initialData?._id || "new-service"}
          initialData={initialData}
          onClose={onClose}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}

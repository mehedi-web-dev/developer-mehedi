"use client";

import * as React from "react";
import Image from "next/image";
import {
  Settings,
  User,
  Share2,
  Cpu,
  Briefcase,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Plus,
  Trash2,
  RefreshCw,
  UploadCloud,
} from "lucide-react";
import {
  getAdminSiteSettings,
  updateAdminSiteSettings,
  uploadSingleImage,
  MAX_UPLOAD_SIZE_BYTES,
} from "@/services/admin.service";
import type { SiteSettings } from "@/types";

export function SettingsManager() {
  const [activeTab, setActiveTab] = React.useState<"personal" | "social" | "skills" | "experience">("personal");
  const [settings, setSettings] = React.useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [successNotice, setSuccessNotice] = React.useState<string | null>(null);

  // Form states for Personal Info
  const [personalName, setPersonalName] = React.useState("");
  const [personalTitle, setPersonalTitle] = React.useState("");
  const [personalBio, setPersonalBio] = React.useState("");
  const [personalEmail, setPersonalEmail] = React.useState("");
  const [personalPhone, setPersonalPhone] = React.useState("");
  const [personalLocation, setPersonalLocation] = React.useState("");
  const [personalProfileImage, setPersonalProfileImage] = React.useState("");
  const [personalResumeUrl, setPersonalResumeUrl] = React.useState("");
  const [personalAvailableForHire, setPersonalAvailableForHire] = React.useState(true);

  // Avatar upload state
  const [isUploadingAvatar, setIsUploadingAvatar] = React.useState(false);
  const [avatarError, setAvatarError] = React.useState<string | null>(null);
  const avatarFileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarError(null);
    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
      setAvatarError(
        `File size exceeds 10 MB limit (${(file.size / (1024 * 1024)).toFixed(2)} MB).`
      );
      if (avatarFileInputRef.current) avatarFileInputRef.current.value = "";
      return;
    }

    setIsUploadingAvatar(true);
    try {
      const res = await uploadSingleImage(file);
      setPersonalProfileImage(res.url || res.displayUrl);
      showSuccess("Avatar uploaded successfully through backend storage.");
    } catch (err) {
      console.error("[Settings Manager] Avatar upload failed:", err);
      setAvatarError(err instanceof Error ? err.message : "Failed to upload avatar image.");
    } finally {
      setIsUploadingAvatar(false);
      if (avatarFileInputRef.current) avatarFileInputRef.current.value = "";
    }
  };

  // Social Links state
  const [socialLinks, setSocialLinks] = React.useState<Array<{ platform: string; url: string; icon?: string }>>([]);
  const [newPlatform, setNewPlatform] = React.useState("");
  const [newPlatformUrl, setNewPlatformUrl] = React.useState("");

  // Skills state
  const [skills, setSkills] = React.useState<Array<{ category: string; items: string[] }>>([]);
  const [newSkillCategory, setNewSkillCategory] = React.useState("");
  const [newSkillTag, setNewSkillTag] = React.useState<Record<number, string>>({});

  // Experience state
  const [experience, setExperience] = React.useState<
    Array<{
      title: string;
      company: string;
      location?: string;
      startDate?: string | null;
      endDate?: string | null;
      current?: boolean;
      description?: string;
      technologies?: string[];
    }>
  >([]);

  const showSuccess = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => {
      setSuccessNotice((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const populateStates = (s: SiteSettings) => {
    const p = s.personalInfo || {};
    setPersonalName(p.name || "");
    setPersonalTitle(p.title || "");
    setPersonalBio(p.bio || "");
    setPersonalEmail(p.email || "");
    setPersonalPhone(p.phone || "");
    setPersonalLocation(p.location || "");
    setPersonalProfileImage(p.profileImage || "");
    setPersonalResumeUrl(p.resumeUrl || "");
    setPersonalAvailableForHire(p.availableForHire ?? true);

    setSocialLinks(Array.isArray(s.socialLinks) ? [...s.socialLinks] : []);
    setSkills(Array.isArray(s.skills) ? [...s.skills] : []);
    setExperience(
      Array.isArray(s.experience)
        ? s.experience.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? String(exp.startDate).slice(0, 10) : "",
            endDate: exp.endDate ? String(exp.endDate).slice(0, 10) : "",
          }))
        : []
    );
  };

  const fetchSettings = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAdminSiteSettings();
      setSettings(data);
      populateStates(data);
    } catch (err) {
      console.error("[Settings Manager] Failed to load settings:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load settings. Verify backend server is running."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let active = true;
    const loadInitial = async () => {
      try {
        const data = await getAdminSiteSettings();
        if (active) {
          setSettings(data);
          populateStates(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load settings. Verify backend server is running."
          );
          setIsLoading(false);
        }
      }
    };
    void loadInitial();
    return () => {
      active = false;
    };
  }, []);

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const payload: Partial<SiteSettings> = {
      personalInfo: {
        name: personalName.trim(),
        title: personalTitle.trim(),
        bio: personalBio.trim(),
        email: personalEmail.trim(),
        phone: personalPhone.trim(),
        location: personalLocation.trim(),
        profileImage: personalProfileImage.trim(),
        resumeUrl: personalResumeUrl.trim(),
        availableForHire: personalAvailableForHire,
      },
      socialLinks,
      skills,
      experience: experience.map((exp) => ({
        ...exp,
        startDate: exp.startDate || null,
        endDate: exp.endDate || null,
      })),
      education: settings?.education || [],
    };

    try {
      const updated = await updateAdminSiteSettings(payload);
      setSettings(updated);
      populateStates(updated);
      showSuccess("Site settings successfully saved and synced with public website.");
    } catch (err) {
      console.error("[Settings Manager] Save failed:", err);
      setError(err instanceof Error ? err.message : "Failed to update site settings.");
    } finally {
      setIsSaving(false);
    }
  };

  // Social Links operations
  const handleAddSocialLink = () => {
    if (!newPlatform.trim() || !newPlatformUrl.trim()) return;
    setSocialLinks([
      ...socialLinks,
      { platform: newPlatform.trim(), url: newPlatformUrl.trim() },
    ]);
    setNewPlatform("");
    setNewPlatformUrl("");
  };

  const handleRemoveSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  // Skills operations
  const handleAddSkillCategory = () => {
    if (!newSkillCategory.trim()) return;
    setSkills([...skills, { category: newSkillCategory.trim(), items: [] }]);
    setNewSkillCategory("");
  };

  const handleRemoveSkillCategory = (catIndex: number) => {
    setSkills(skills.filter((_, i) => i !== catIndex));
  };

  const handleAddSkillItem = (catIndex: number) => {
    const val = (newSkillTag[catIndex] || "").trim();
    if (!val) return;
    setSkills(
      skills.map((c, i) =>
        i === catIndex && !c.items.includes(val)
          ? { ...c, items: [...c.items, val] }
          : c
      )
    );
    setNewSkillTag((prev) => ({ ...prev, [catIndex]: "" }));
  };

  const handleRemoveSkillItem = (catIndex: number, itemIndex: number) => {
    setSkills(
      skills.map((c, i) =>
        i === catIndex
          ? { ...c, items: c.items.filter((_, idx) => idx !== itemIndex) }
          : c
      )
    );
  };

  // Experience operations
  const handleAddExperience = () => {
    setExperience([
      ...experience,
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        technologies: [],
      },
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-[#101827]/80 border border-white/10 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <Settings className="w-5 h-5 text-violet-400" />
              <span>Site Settings & Profile</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Configure profile bio, contact info, availability, social links, and skills stack.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchSettings}
            disabled={isLoading || isSaving}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition-all disabled:opacity-50"
            title="Refresh settings"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin text-violet-400" : ""}`}
            />
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isLoading || isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between text-rose-300 text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={fetchSettings}
            className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-[11px] font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#101827]/80 border border-white/10 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("personal")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === "personal"
              ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Personal & Bio</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("social")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === "social"
              ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Social Links ({socialLinks.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("skills")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === "skills"
              ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Skills Stack ({skills.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("experience")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === "experience"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Experience Timeline ({experience.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      {isLoading ? (
        <div className="p-8 rounded-2xl bg-[#101827]/80 border border-white/10 space-y-4 animate-pulse">
          <div className="h-6 w-48 bg-white/10 rounded" />
          <div className="h-10 w-full bg-white/5 rounded-xl" />
          <div className="h-10 w-full bg-white/5 rounded-xl" />
        </div>
      ) : (
        <div className="rounded-2xl bg-[#101827]/80 border border-white/10 p-6 sm:p-8 shadow-xl">
          {/* TAB 1: PERSONAL & BIO */}
          {activeTab === "personal" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={personalName}
                    onChange={(e) => setPersonalName(e.target.value)}
                    placeholder="Mehedi Hasan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    value={personalTitle}
                    onChange={(e) => setPersonalTitle(e.target.value)}
                    placeholder="WordPress & Frontend Developer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Short Bio / Headline Summary
                </label>
                <textarea
                  rows={3}
                  value={personalBio}
                  onChange={(e) => setPersonalBio(e.target.value)}
                  placeholder="Tell clients about your expertise, background, and delivery standard..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={personalEmail}
                    onChange={(e) => setPersonalEmail(e.target.value)}
                    placeholder="mehedihasan958327@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={personalPhone}
                    onChange={(e) => setPersonalPhone(e.target.value)}
                    placeholder="+880 1..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Location
                  </label>
                  <input
                    type="text"
                    value={personalLocation}
                    onChange={(e) => setPersonalLocation(e.target.value)}
                    placeholder="Bangladesh"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    Profile / Avatar Image
                  </label>
                  <span className="text-[10px] text-slate-400">
                    JPG, PNG or WEBP (Max 10 MB)
                  </span>
                </div>

                {avatarError && (
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                    <span>{avatarError}</span>
                  </div>
                )}

                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center">
                    {personalProfileImage ? (
                      <Image
                        src={personalProfileImage}
                        alt="Profile avatar"
                        fill
                        className="object-cover"
                        sizes="56px"
                        unoptimized={personalProfileImage.startsWith("http")}
                      />
                    ) : (
                      <User className="w-6 h-6 text-slate-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <input
                      type="url"
                      value={personalProfileImage}
                      onChange={(e) => setPersonalProfileImage(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-cyan-300 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => avatarFileInputRef.current?.click()}
                        disabled={isUploadingAvatar || isSaving}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition-colors"
                      >
                        {isUploadingAvatar ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <UploadCloud className="w-3 h-3" />
                        )}
                        <span>{isUploadingAvatar ? "Uploading to ImgBB..." : "Upload Photo"}</span>
                      </button>
                      {personalProfileImage && (
                        <button
                          type="button"
                          onClick={() => setPersonalProfileImage("")}
                          className="px-2.5 py-1 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  <input
                    ref={avatarFileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Resume / CV Link
                </label>
                <input
                  type="url"
                  value={personalResumeUrl}
                  onChange={(e) => setPersonalResumeUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-cyan-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                />
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Available for New Projects
                  </p>
                  <p className="text-xs text-slate-400">
                    Displays green availability beacon badge across hero and navbar
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={personalAvailableForHire}
                  onChange={(e) => setPersonalAvailableForHire(e.target.checked)}
                  className="w-5 h-5 rounded accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 2: SOCIAL LINKS */}
          {activeTab === "social" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <input
                  type="text"
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  placeholder="Platform (e.g. GitHub, LinkedIn, Twitter)"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
                <input
                  type="url"
                  value={newPlatformUrl}
                  onChange={(e) => setNewPlatformUrl(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-cyan-300 text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono"
                />
                <button
                  type="button"
                  onClick={handleAddSocialLink}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Link</span>
                </button>
              </div>

              {socialLinks.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">
                  No social links configured yet.
                </p>
              ) : (
                <div className="divide-y divide-white/5">
                  {socialLinks.map((link, idx) => (
                    <div
                      key={idx}
                      className="py-3 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-0.5">
                        <span className="text-sm font-semibold text-white">
                          {link.platform}
                        </span>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block text-xs font-mono text-cyan-400 hover:underline"
                        >
                          {link.url}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSocialLink(idx)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                        title="Remove link"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SKILLS STACK */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="flex gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <input
                  type="text"
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  placeholder="New Category (e.g. Frontend, WordPress, Backend)"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  type="button"
                  onClick={handleAddSkillCategory}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Category</span>
                </button>
              </div>

              <div className="space-y-4">
                {skills.map((cat, catIdx) => (
                  <div
                    key={catIdx}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">
                        {cat.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkillCategory(catIdx)}
                        className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors"
                        title="Remove category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkillTag[catIdx] || ""}
                        onChange={(e) =>
                          setNewSkillTag((prev) => ({
                            ...prev,
                            [catIdx]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddSkillItem(catIdx);
                          }
                        }}
                        placeholder="Add skill tag (e.g. Tailwind CSS) and press Enter..."
                        className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddSkillItem(catIdx)}
                        className="px-3 py-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 text-xs font-medium"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item, itemIdx) => (
                        <span
                          key={itemIdx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-amber-500/10 border border-amber-500/20 text-amber-300"
                        >
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSkillItem(catIdx, itemIdx)}
                            className="text-slate-400 hover:text-rose-400"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EXPERIENCE */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Manage professional milestones and career timeline
                </p>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Role</span>
                </button>
              </div>

              {experience.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">
                  No experience entries recorded.
                </p>
              ) : (
                <div className="space-y-4">
                  {experience.map((exp, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-emerald-400">
                          Role #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveExperience(idx)}
                          className="p-1 rounded text-slate-400 hover:text-rose-400"
                          title="Remove role"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) =>
                            setExperience(
                              experience.map((item, i) =>
                                i === idx ? { ...item, title: e.target.value } : item
                              )
                            )
                          }
                          placeholder="Job Title (e.g. WordPress Developer)"
                          className="px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) =>
                            setExperience(
                              experience.map((item, i) =>
                                i === idx ? { ...item, company: e.target.value } : item
                              )
                            )
                          }
                          placeholder="Company / Agency Name"
                          className="px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white"
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={exp.description}
                        onChange={(e) =>
                          setExperience(
                            experience.map((item, i) =>
                              i === idx ? { ...item, description: e.target.value } : item
                            )
                          )
                        }
                        placeholder="Responsibilities and impact..."
                        className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

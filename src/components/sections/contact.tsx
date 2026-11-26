"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  Clock,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "@/components/ui/icons";
import { submitContact } from "@/services";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  _hp: string; // Honeypot field
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  _hp: "",
};

export function ContactSection() {
  const [formData, setFormData] = React.useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const shouldReduceMotion = useReducedMotion();

  const validate = (): boolean => {
    const errs: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      errs.name = "Your name is required";
    } else if (formData.name.trim().length > 100) {
      errs.name = "Name cannot exceed 100 characters";
    }

    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address";
    } else if (formData.email.trim().length > 150) {
      errs.email = "Email cannot exceed 150 characters";
    }

    if (!formData.subject.trim()) {
      errs.subject = "Subject is required";
    } else if (formData.subject.trim().length > 200) {
      errs.subject = "Subject cannot exceed 200 characters";
    }

    if (!formData.message.trim()) {
      errs.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long";
    } else if (formData.message.trim().length > 3000) {
      errs.message = "Message cannot exceed 3000 characters";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);
    setServerError(null);
    setSubmitSuccess(false);

    try {
      const response = await submitContact({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        _hp: formData._hp,
      });

      if (response.success) {
        setSubmitSuccess(true);
        setFormData(INITIAL_FORM);
      } else {
        setServerError(
          response.error || "Unable to send your inquiry at this moment. Please try again."
        );
      }
    } catch {
      setServerError(
        "Unable to send your inquiry right now. Please check your internet connection or try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 border-t border-[var(--border)] relative overflow-hidden bg-[var(--surface-subtle)]/30">
      {/* Soft background ambient glow */}
      <div
        className="pointer-events-none absolute top-1/4 -left-48 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -right-48 h-96 w-96 rounded-full bg-[var(--secondary)]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16 items-start">
          {/* Left Column: Contact Information */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Header Lockup */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1 text-xs font-semibold tracking-wider text-[var(--secondary)] font-mono shadow-xs">
                <Sparkles className="h-3 w-3 text-cyan-400" />
                <span>GET IN TOUCH</span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[var(--foreground)] leading-[1.18]">
                Let&apos;s Build Something Great Together
              </h2>

              <p className="text-sm leading-relaxed text-[var(--muted)]">
                Have a project in mind? Let&apos;s discuss your goals and create a website that helps your business grow.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3.5">
              {/* Email */}
              <a
                href="mailto:mehedihasan958327@gmail.com"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 hover:bg-[var(--surface)] hover:border-[var(--primary)]/40 hover:shadow-md hover:shadow-[var(--primary)]/10 transition-all duration-300"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] group-hover:scale-105 transition-transform shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] font-medium">
                    Email Address
                  </span>
                  <span className="block text-sm font-semibold text-[var(--foreground)] truncate group-hover:text-[var(--primary)] transition-colors">
                    mehedihasan958327@gmail.com
                  </span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/8801318352581"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 hover:bg-[var(--surface)] hover:border-[#25D366]/40 hover:shadow-md hover:shadow-[#25D366]/10 transition-all duration-300"
                aria-label="Direct WhatsApp message: 01318352581 (opens in new tab)"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366] group-hover:scale-105 transition-transform shrink-0">
                  <WhatsAppIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] font-medium">
                    WhatsApp Chat
                  </span>
                  <span className="block text-sm font-semibold text-[var(--foreground)] group-hover:text-[#25D366] transition-colors">
                    01318352581
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-[var(--secondary)] shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] font-medium">
                    Location
                  </span>
                  <span className="block text-sm font-semibold text-[var(--foreground)]">
                    Noakhali, Bangladesh
                  </span>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                      Current Status
                    </span>
                  </div>
                  <span className="block text-xs sm:text-sm font-medium text-[var(--foreground)] mt-0.5">
                    Available for freelance projects and new opportunities.
                  </span>
                </div>
              </div>
            </div>

            {/* Social Connect */}
            <div className="pt-2">
              <span className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-3">
                Connect Directly
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/mehedi-web-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-semibold text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-200 shadow-xs"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/mehedi-hasan-dev81/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-semibold text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-200 shadow-xs"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.1 }}
            className="lg:col-span-7"
          >
            <div className="glass rounded-3xl p-7 sm:p-10 border border-[var(--border)] shadow-xl relative backdrop-blur-xl">
              {submitSuccess ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in-50 duration-300">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto border border-emerald-500/20 shadow-md">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)]">Message Received!</h3>
                  <p className="text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. I have received your inquiry and will review it and reply as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--surface-subtle)] px-5 py-2.5 text-xs font-semibold text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Honeypot field (hidden from genuine users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="contact_hp_website">Leave this field blank</label>
                    <input
                      id="contact_hp_website"
                      type="text"
                      name="_hp"
                      value={formData._hp}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {serverError && (
                    <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 flex items-center gap-3 text-rose-400 text-xs shadow-xs">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-xs font-semibold text-[var(--foreground)]">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={cn(
                          "w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                          errors.name ? "border-rose-500" : "border-[var(--border)]"
                        )}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-[11px] text-rose-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs font-semibold text-[var(--foreground)]">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="e.g. john@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={cn(
                          "w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                          errors.email ? "border-rose-500" : "border-[var(--border)]"
                        )}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-[11px] text-rose-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="block text-xs font-semibold text-[var(--foreground)]">
                      Subject <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder="e.g. WordPress Redesign & Elementor Development"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={cn(
                        "w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                        errors.subject ? "border-rose-500" : "border-[var(--border)]"
                      )}
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="text-[11px] text-rose-400">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Project Details / Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-xs font-semibold text-[var(--foreground)]">
                      Project Details / Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project, timeline, scope, and business goals..."
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={cn(
                        "w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] resize-y",
                        errors.message ? "border-rose-500" : "border-[var(--border)]"
                      )}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-[11px] text-rose-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/25 transition-all hover:bg-[var(--primary-hover)] hover:shadow-xl hover:shadow-[var(--primary)]/30 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

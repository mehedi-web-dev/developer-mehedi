"use client";

import * as React from "react";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
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
    <section id="contact" className="py-20 sm:py-28 border-t border-[var(--border)] relative">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Direct Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
              <Sparkles className="h-3 w-3" />
              Get In Touch
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[var(--foreground)]">
              Let&apos;s Build Something Great Together
            </h2>

            <p className="text-sm leading-relaxed text-[var(--muted)]">
              Have a WordPress project, a custom web design, or a frontend contract in mind? Fill
              out the form and I will get back to you promptly.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-[var(--primary)] shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--muted)]">Email</h4>
                  <a
                    href="mailto:mehedihasan958327@gmail.com"
                    className="text-sm font-semibold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                  >
                    mehedihasan958327@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-[var(--secondary)] shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--muted)]">Location</h4>
                  <p className="text-sm font-semibold text-[var(--foreground)]">Bangladesh (Remote Worldwide)</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--border)] space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--muted)]">Follow &amp; Connect</h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/mehedi-web-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs font-semibold text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/mehedi-hasan-dev81/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs font-semibold text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass rounded-3xl p-8 sm:p-10 border border-[var(--border)] shadow-xl relative">
              {submitSuccess ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in-50 duration-300">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mx-auto">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)]">Message Received!</h3>
                  <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
                    Thank you for reaching out. I have received your message and will review it and reply as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--surface-subtle)] px-5 py-2.5 text-xs font-semibold text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors"
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
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 flex items-center gap-3 text-red-500 text-xs">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-xs font-semibold text-[var(--foreground)]">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={cn(
                          "w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                          errors.name ? "border-red-500" : "border-[var(--border)]"
                        )}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-[11px] text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs font-semibold text-[var(--foreground)]">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={cn(
                          "w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                          errors.email ? "border-red-500" : "border-[var(--border)]"
                        )}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-[11px] text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="block text-xs font-semibold text-[var(--foreground)]">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder="WordPress Redesign Inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={cn(
                        "w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                        errors.subject ? "border-red-500" : "border-[var(--border)]"
                      )}
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="text-[11px] text-red-500">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-xs font-semibold text-[var(--foreground)]">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Please share details about your website, timeline, and goals..."
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={cn(
                        "w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] resize-y",
                        errors.message ? "border-red-500" : "border-[var(--border)]"
                      )}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-[11px] text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/25 transition-all hover:bg-[var(--primary-hover)] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

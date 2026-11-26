"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, MapPin, ArrowUp, ChevronRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "@/components/ui/icons";
import { BrandLogo } from "@/components/ui/brand-logo";

const NAV_LINKS = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/#contact" },
];

const SERVICE_LINKS = [
  {
    label: "WordPress Website Development",
    href: "/services#wordpress-website-design-development",
  },
  {
    label: "Elementor Pro Design",
    href: "/services#elementor-pro-website-design",
  },
  {
    label: "WooCommerce Development",
    href: "/services#woocommerce-store-development",
  },
  {
    label: "WordPress Malware Removal",
    href: "/services#wordpress-malware-removal-security",
  },
  {
    label: "WordPress Bug Fixing",
    href: "/services#wordpress-bug-fixing-troubleshooting",
  },
  {
    label: "Website Redesign & Migration",
    href: "/services#website-redesign-migration-optimization",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--surface-subtle)]/70 text-[var(--foreground)] transition-colors backdrop-blur-md overflow-hidden">
      {/* Subtle top ambient glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-44 w-[600px] max-w-full rounded-full bg-gradient-to-r from-[var(--primary)]/10 via-[var(--secondary)]/10 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-12">
          {/* A. Brand Section */}
          <div className="space-y-4">
            <BrandLogo size="footer" />
            <div className="space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--secondary)] font-mono">
                WordPress &amp; Frontend Developer
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-[var(--muted)]">
                I build modern, responsive, and high-performing websites that help businesses establish a stronger online presence.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://github.com/mehedi-web-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-md hover:shadow-[var(--primary)]/15"
                aria-label="GitHub Profile (opens in new tab)"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/mehedi-hasan-dev81/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-md hover:shadow-[var(--primary)]/15"
                aria-label="LinkedIn Profile (opens in new tab)"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/8801318352581"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#25D366] hover:text-[#25D366] hover:shadow-md hover:shadow-[#25D366]/20"
                aria-label="WhatsApp Contact (opens in new tab)"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* B. Quick Navigation */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--muted)]">
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-[var(--primary)]"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-[var(--primary)]" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* C. Services */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--secondary)]" />
              Services
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--muted)]">
              {SERVICE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-[var(--secondary)]"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-[var(--secondary)]" />
                    <span className="line-clamp-1">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* D. Contact Information */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Contact
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-[var(--muted)]">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[var(--secondary)] shrink-0 mt-0.5" />
                <span className="text-[var(--foreground)]">Noakhali, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <WhatsAppIcon className="h-4 w-4 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/8801318352581"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)] hover:text-[#25D366] transition-colors"
                  aria-label="Direct WhatsApp message: 01318352581"
                >
                  01318352581
                </a>
              </div>
              <div className="flex items-center gap-2.5 break-all">
                <Mail className="h-4 w-4 text-[var(--primary)] shrink-0" />
                <a
                  href="mailto:mehedihasan958327@gmail.com"
                  className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                  aria-label="Send email to mehedihasan958327@gmail.com"
                >
                  mehedihasan958327@gmail.com
                </a>
              </div>

              {/* Availability Status Badge */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-400 shadow-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Available for New Projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Bottom Footer Bar */}
        <div className="mt-12 sm:mt-16 border-t border-[var(--border)] pt-8 flex flex-col items-center justify-between gap-4 text-xs text-[var(--muted)] md:flex-row">
          <p className="text-center md:text-left">
            &copy; {currentYear} Mehedi Hasan. All rights reserved.
          </p>

          <p className="text-center text-[var(--muted)] font-medium">
            Designed &amp; Developed by Mehedi Hasan
          </p>

          {/* Back to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-semibold text-[var(--foreground)] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-md hover:shadow-[var(--primary)]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] cursor-pointer"
            aria-label="Back to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

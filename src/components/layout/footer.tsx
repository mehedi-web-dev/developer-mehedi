import Link from "next/link";
import { Mail, ArrowUpRight, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--surface-subtle)] text-[var(--foreground)] transition-colors">
      <div className="container-custom py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white shadow-sm">
                <Code2 className="h-4 w-4" />
              </div>
              <span className="font-sans text-lg font-bold tracking-tight text-[var(--foreground)]">
                Mehedi Hasan
              </span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-[var(--muted)]">
              WordPress & Frontend Developer specializing in Elementor Pro, WooCommerce, React, and
              Next.js. Crafting clean, accessible, and high-performing web experiences.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/mehedi-web-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/mehedi-hasan-dev81/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:mehedihasan958327@gmail.com"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                aria-label="Email Mehedi Hasan"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>
                <Link href="/#hero" className="transition-colors hover:text-[var(--primary)]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="transition-colors hover:text-[var(--primary)]">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/services" className="transition-colors hover:text-[var(--primary)]">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="transition-colors hover:text-[var(--primary)]">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="transition-colors hover:text-[var(--primary)]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Details */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
              Contact & Location
            </h3>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <p>Location: Bangladesh</p>
              <p className="break-all">
                Email:{" "}
                <a
                  href="mailto:mehedihasan958327@gmail.com"
                  className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  mehedihasan958327@gmail.com
                </a>
              </p>
              <p>
                Portfolio:{" "}
                <a
                  href="https://mehedihasanbd.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  mehedihasanbd.com
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 text-xs text-[var(--muted)] sm:flex-row">
          <p>&copy; {currentYear} Mehedi Hasan. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Next.js 16, React 19 &amp; Tailwind CSS v4
          </p>
        </div>
      </div>
    </footer>
  );
}

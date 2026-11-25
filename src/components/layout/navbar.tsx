"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Code2 } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeHash, setActiveHash] = React.useState("");
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy for homepage
      if (pathname === "/") {
        const sections = ["hero", "about", "skills", "services-preview", "portfolio-preview", "contact"];
        const scrollPosition = window.scrollY + 100;

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveHash(`#${sectionId}`);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Close mobile menu on resize to desktop
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);

    // If anchor link on homepage
    if (href.startsWith("/#") && pathname === "/") {
      const targetId = href.replace("/#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isActive = (href: string) => {
    if (href === "/services" && pathname.startsWith("/services")) return true;
    if (href === "/portfolio" && pathname.startsWith("/portfolio")) return true;
    if (pathname === "/" && href.startsWith("/#")) {
      const hash = href.replace("/", "");
      return activeHash === hash;
    }
    return false;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container-custom flex h-16 items-center justify-between">
        {/* Brand / Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-lg p-1"
          aria-label="Mehedi Hasan - Home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white shadow-md shadow-[var(--primary)]/20 transition-transform duration-300 group-hover:scale-105">
            <Code2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-base font-bold tracking-tight text-[var(--foreground)]">
              Mehedi Hasan
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
              WordPress & Frontend
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => handleLinkClick(item.href)}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                  active
                    ? "text-[var(--primary)] font-semibold"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-[var(--primary)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Theme Toggle */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href="/#contact"
            onClick={() => handleLinkClick("/#contact")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[var(--primary-hover)] hover:shadow-md hover:shadow-[var(--primary)]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] active:scale-95"
          >
            Hire Me
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-b border-[var(--border)] bg-[var(--background)]/95 px-4 pt-2 pb-6 backdrop-blur-xl md:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                    active
                      ? "bg-[var(--primary)]/10 text-[var(--primary)] font-semibold"
                      : "text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                  )}
                >
                  {item.label}
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />}
                </Link>
              );
            })}
            <div className="pt-3">
              <Link
                href="/#contact"
                onClick={() => handleLinkClick("/#contact")}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--primary-hover)]"
              >
                Let&apos;s Work Together
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const navLinks = [
    { label: "Home", href: "/#hero" },
    { label: "About Me", href: "/#about" },
    { label: "Web development", href: "/#expectations" },
    { label: "Services", href: "/#services" },
    { label: "Portfolio", href: "/#portfolio-preview" },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/#") && pathname === "/") {
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div ref={navRef} className="relative pointer-events-auto flex flex-col items-center">
        {/* ================= DESKTOP NAVBAR PILL ================= */}
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`hidden lg:flex items-center gap-7 px-5 py-2.5 rounded-full border transition-all duration-300 shadow-2xl backdrop-blur-xl ${
            scrolled
              ? "bg-[#141517]/95 border-white/15 shadow-black/80"
              : "bg-[#161719]/90 border-white/10"
          }`}
        >
          {/* Monogram M Logo */}
          <Link
            href="/#hero"
            onClick={() => handleLinkClick("/#hero")}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:opacity-80 transition-opacity focus:outline-none"
            aria-label="Home"
          >
            <span className="font-display font-extrabold text-base tracking-tight text-white select-none">
              M
            </span>
          </Link>

          {/* Horizontal Desktop Navigation Links */}
          <div className="flex items-center gap-6 text-xs font-medium text-zinc-300">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => handleLinkClick(item.href)}
                className="hover:text-white transition-colors tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* White Pill Contact Button */}
          <Link
            href="/#contact"
            onClick={() => handleLinkClick("/#contact")}
            className="px-5 py-2 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-semibold tracking-wide transition-all shadow-md ml-1"
          >
            Contact
          </Link>
        </motion.nav>

        {/* Glowing Accent Dot matching Framer Reference */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="hidden lg:block w-2.5 h-2.5 rounded-full bg-[#c6ff00] shadow-[0_0_10px_#c6ff00] mt-3.5 select-none pointer-events-none"
        />

        {/* ================= MOBILE NAVBAR PILL ================= */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`flex lg:hidden items-center justify-between gap-2.5 sm:gap-3 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border transition-all duration-300 shadow-2xl backdrop-blur-xl max-w-[95vw] ${
            scrolled
              ? "bg-[#141517]/95 border-white/15 shadow-black/80"
              : "bg-[#161719]/90 border-white/10"
          }`}
        >
          <Link
            href="/#hero"
            onClick={() => handleLinkClick("/#hero")}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm text-white shrink-0"
          >
            M
          </Link>

          <Link
            href="/#contact"
            onClick={() => handleLinkClick("/#contact")}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] border border-white/5 text-[11px] sm:text-xs font-medium text-zinc-300 truncate"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c6ff00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c6ff00]" />
            </span>
            <span className="truncate">Available for projects</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            className="w-8 h-8 rounded-full bg-[#c6ff00] text-black flex flex-col items-center justify-center gap-1 cursor-pointer shrink-0"
          >
            {isOpen ? (
              <span className="font-bold text-sm leading-none">✕</span>
            ) : (
              <div className="flex flex-col gap-1 items-center justify-center">
                <span className="block w-3.5 h-[2px] bg-black rounded-full" />
                <span className="block w-3.5 h-[2px] bg-black rounded-full" />
              </div>
            )}
          </button>
        </motion.div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute top-full mt-2 w-64 sm:w-72 bg-[#131416]/95 backdrop-blur-xl border border-white/15 rounded-3xl p-3.5 shadow-2xl overflow-hidden z-50"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-2xl text-left text-sm font-medium text-zinc-200 hover:text-black hover:bg-[#c6ff00] transition-all"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-40" />
                  </Link>
                ))}
                <Link
                  href="/#contact"
                  onClick={() => handleLinkClick("/#contact")}
                  className="mt-2 w-full text-center py-2.5 rounded-full bg-white text-black font-semibold text-xs"
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

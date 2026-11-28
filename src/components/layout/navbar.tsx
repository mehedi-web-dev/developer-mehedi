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

  // Close dropdown when clicking outside
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
    { label: "Web Development", href: "/#expectations" },
    { label: "Services & Automation", href: "/#services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/#contact" },
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
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div ref={navRef} className="relative pointer-events-auto flex flex-col items-center">
        {/* Floating Top Navbar Pill */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`flex items-center justify-between gap-3 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border transition-all duration-300 shadow-2xl backdrop-blur-xl ${
            scrolled
              ? "bg-[#141517]/90 border-white/15 shadow-black/80"
              : "bg-[#161719]/80 border-white/10"
          }`}
        >
          {/* Monogram Logo (M) */}
          <Link
            href="/#hero"
            className="flex items-center gap-2.5 group focus:outline-none"
            onClick={() => handleLinkClick("/#hero")}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1f2024] to-[#2a2c32] border border-white/15 flex items-center justify-center font-bold text-sm text-[#c6ff00] group-hover:scale-105 transition-transform overflow-hidden shadow-inner font-display select-none">
              <span>M</span>
            </div>
          </Link>

          {/* Availability Status Indicator Link */}
          <Link
            href="/#contact"
            onClick={() => handleLinkClick("/#contact")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 transition-all text-xs font-medium text-zinc-300 hover:text-white"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c6ff00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c6ff00]" />
            </span>
            <span className="hidden sm:inline">Available for projects</span>
            <span className="sm:hidden">Available</span>
          </Link>

          {/* Lime Circular Menu Toggle Button (= / X) */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            className="w-9 h-9 rounded-full bg-[#c6ff00] hover:bg-[#d4ff33] text-black flex flex-col items-center justify-center gap-1 transition-all transform active:scale-95 shadow-md shadow-[#c6ff00]/20 cursor-pointer"
          >
            {isOpen ? (
              <span className="font-bold text-base leading-none">✕</span>
            ) : (
              <div className="flex flex-col gap-1 items-center justify-center">
                <span className="block w-4 h-[2px] bg-black rounded-full" />
                <span className="block w-4 h-[2px] bg-black rounded-full" />
              </div>
            )}
          </button>
        </motion.div>

        {/* Dropdown Menu Unfolding Directly from Navbar Pill */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full mt-3 w-72 sm:w-80 bg-[#131416]/95 backdrop-blur-xl border border-white/15 rounded-3xl p-4 sm:p-5 shadow-2xl overflow-hidden z-50"
            >
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 px-2">
                <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold font-mono">
                  Navigation
                </span>
                <span className="text-[11px] text-[#c6ff00] font-mono">
                  Mehedi Hasan
                </span>
              </div>

              <div className="flex flex-col gap-1">
                {navLinks.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 + 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => handleLinkClick(item.href)}
                      className="flex items-center justify-between w-full px-3 py-2.5 rounded-2xl text-left text-sm sm:text-base font-medium text-zinc-200 hover:text-black hover:bg-[#c6ff00] transition-all group"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 px-2 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <span>mehedi.dev81@gmail.com</span>
                <span className="text-[#c6ff00]">Available Remote</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

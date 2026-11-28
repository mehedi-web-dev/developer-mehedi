"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      {/* Floating Top Navbar Pill */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-full border transition-all duration-300 shadow-2xl backdrop-blur-xl ${
            scrolled
              ? "bg-[#141517]/90 border-white/15 shadow-black/80"
              : "bg-[#161719]/80 border-white/10"
          }`}
        >
          {/* Monogram Logo */}
          <Link
            href="/#hero"
            className="flex items-center gap-2.5 group focus:outline-none"
            onClick={() => handleLinkClick("/#hero")}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1f2024] to-[#2a2c32] border border-white/15 flex items-center justify-center font-bold text-sm text-[#c6ff00] group-hover:scale-105 transition-transform overflow-hidden shadow-inner font-display">
              <span>M</span>
            </div>
          </Link>

          {/* Status Indicator */}
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

          {/* Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            className="w-9 h-9 rounded-full bg-[#c6ff00] hover:bg-[#d4ff33] text-black flex items-center justify-center transition-all transform active:scale-95 shadow-md shadow-[#c6ff00]/20"
          >
            {isOpen ? (
              <X className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <Menu className="w-5 h-5 stroke-[2.5]" />
            )}
          </button>
        </motion.div>
      </header>

      {/* Modal Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#131416] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                  Navigation
                </span>
                <span className="text-xs text-[#c6ff00] font-mono">
                  Mehedi Hasan
                </span>
              </div>

              <div className="flex flex-col gap-2 mt-6">
                {navLinks.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => handleLinkClick(item.href)}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-2xl text-left text-lg font-medium text-zinc-200 hover:text-black hover:bg-[#c6ff00] transition-all group"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>mehedi.dev81@gmail.com</span>
                <span className="text-[#c6ff00]">Available Remote</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

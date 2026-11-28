"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "@/components/ui/icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full bg-[#c6ff00] text-black pt-16 pb-12 px-6 sm:px-12 mt-20 relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 pb-12 border-b border-black/20">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-black/70 mb-2 block font-mono">
              WORDPRESS &amp; FRONTEND DEVELOPER
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight leading-none text-black">
              MEHEDI HASAN
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div>
              <span className="text-xs font-bold text-black/60 block mb-1">
                Email :
              </span>
              <a
                href="mailto:mehedi.dev81@gmail.com"
                className="text-base sm:text-lg font-semibold hover:underline inline-flex items-center gap-1 text-black"
              >
                mehedi.dev81@gmail.com
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="sm:border-l sm:border-black/20 sm:pl-6">
              <span className="text-xs font-bold text-black/60 block mb-1">
                Connect :
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/mehedi-web-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-black/10 hover:bg-black hover:text-[#c6ff00] text-black flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mehedi-hasan-dev81/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-black/10 hover:bg-black hover:text-[#c6ff00] text-black flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/8801318352581"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-black/10 hover:bg-black hover:text-[#c6ff00] text-black flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-medium text-black/70">
          <p>© Copyright {currentYear}. All Rights Reserved by Mehedi Hasan</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-black font-semibold underline underline-offset-4 flex items-center gap-1 cursor-pointer"
            >
              Back to top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

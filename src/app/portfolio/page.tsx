import type { Metadata } from "next";
import { PortfolioCatalog } from "@/components/portfolio/portfolio-catalog";

export const metadata: Metadata = {
  title: "Portfolio — Case Studies & Web Showcase",
  description:
    "Browse featured projects and case studies developed by Mehedi Hasan, featuring custom WordPress themes, Elementor Pro websites, and modern React/Next.js frontend applications.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Portfolio | Mehedi Hasan — WordPress & Frontend Developer",
    description:
      "Browse featured projects and case studies developed by Mehedi Hasan, featuring custom WordPress themes, Elementor Pro websites, and modern React/Next.js frontend applications.",
    url: "/portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Mehedi Hasan — WordPress & Frontend Developer",
    description:
      "Browse featured projects and case studies developed by Mehedi Hasan, featuring custom WordPress themes, Elementor Pro websites, and modern React/Next.js frontend applications.",
  },
};

export default function PortfolioPage() {
  return <PortfolioCatalog />;
}

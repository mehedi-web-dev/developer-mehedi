import type { Metadata } from "next";
import { PortfolioCatalog } from "@/components/portfolio/portfolio-catalog";

export const metadata: Metadata = {
  title: "Portfolio | Mehedi Hasan — WordPress & Frontend Developer",
  description:
    "Browse through featured projects and case studies developed by Mehedi Hasan, featuring custom WordPress themes, Elementor Pro websites, and modern React/Next.js frontend applications.",
  openGraph: {
    title: "Portfolio | Mehedi Hasan — WordPress & Frontend Developer",
    description:
      "Browse through featured projects and case studies developed by Mehedi Hasan, featuring custom WordPress themes, Elementor Pro websites, and modern React/Next.js frontend applications.",
    type: "website",
  },
};

export default function PortfolioPage() {
  return <PortfolioCatalog />;
}

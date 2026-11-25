import type { Metadata } from "next";
import { ServicesCatalog } from "@/components/services/services-catalog";

export const metadata: Metadata = {
  title: "Services — Web & WordPress Development",
  description:
    "Explore professional web development services offered by Mehedi Hasan, including custom WordPress themes, Elementor Pro design, WooCommerce solutions, and modern Next.js engineering.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Mehedi Hasan — WordPress & Frontend Developer",
    description:
      "Explore professional web development services offered by Mehedi Hasan, including custom WordPress themes, Elementor Pro design, WooCommerce solutions, and modern Next.js engineering.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Mehedi Hasan — WordPress & Frontend Developer",
    description:
      "Explore professional web development services offered by Mehedi Hasan, including custom WordPress themes, Elementor Pro design, WooCommerce solutions, and modern Next.js engineering.",
  },
};

export default function ServicesPage() {
  return <ServicesCatalog />;
}

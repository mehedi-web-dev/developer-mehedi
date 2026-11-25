import type { Metadata } from "next";
import { ServicesCatalog } from "@/components/services/services-catalog";

export const metadata: Metadata = {
  title: "Services | Mehedi Hasan — WordPress & Frontend Developer",
  description:
    "Explore professional web development services offered by Mehedi Hasan, including custom WordPress themes, Elementor Pro design, WooCommerce solutions, and modern Next.js engineering.",
  openGraph: {
    title: "Services | Mehedi Hasan — WordPress & Frontend Developer",
    description:
      "Explore professional web development services offered by Mehedi Hasan, including custom WordPress themes, Elementor Pro design, WooCommerce solutions, and modern Next.js engineering.",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesCatalog />;
}

import type { Metadata } from "next";
import {
  ScrollStoryWrapper,
  ServicesPreviewSection,
  ProjectsPreviewSection,
  ReviewsSection,
  FAQSection,
  ContactSection,
} from "@/components/sections";
import { getSiteSettings, getFeaturedProjects } from "@/services";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mehedi Hasan | Digital Developer & WordPress Specialist",
  description:
    "Explore high-performance WordPress, Elementor Pro, React, and Next.js web applications by Mehedi Hasan. Guaranteed fast delivery, clean architecture, and conversion-focused design.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mehedi Hasan | Digital Developer & WordPress Specialist",
    description:
      "Explore high-performance WordPress, Elementor Pro, React, and Next.js web applications by Mehedi Hasan.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehedi Hasan | Digital Developer & WordPress Specialist",
    description:
      "Explore high-performance WordPress, Elementor Pro, React, and Next.js web applications by Mehedi Hasan.",
  },
};

export default async function Home() {
  const [siteSettings, initialProjects] = await Promise.all([
    getSiteSettings().catch(() => null),
    getFeaturedProjects().catch(() => null),
  ]);

  return (
    <div className="flex flex-col bg-[#0c0d0e] text-[#f4f4f5] selection:bg-[#c6ff00] selection:text-black">
      {/* Unified 3D Scroll Story: Hero + Expectations + About with Sticky 3D Flipping Card */}
      <ScrollStoryWrapper siteSettings={siteSettings} />

      {/* Services & Automation Section */}
      <ServicesPreviewSection />

      {/* Featured Projects Section */}
      <ProjectsPreviewSection initialProjects={initialProjects} />

      {/* Testimonials & Proof Section */}
      <ReviewsSection />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Contact Form & WhatsApp */}
      <ContactSection />
    </div>
  );
}

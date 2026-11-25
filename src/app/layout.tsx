import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/providers";
import { Navbar, Footer } from "@/components/layout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#080B14" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mehedi Hasan | WordPress & Frontend Developer",
    template: "%s | Mehedi Hasan",
  },
  description:
    "Mehedi Hasan is a WordPress and Frontend Developer specializing in WordPress, Elementor, React and Next.js.",
  keywords: [
    "Mehedi Hasan",
    "WordPress Developer",
    "Frontend Developer",
    "Elementor Pro Developer",
    "WooCommerce",
    "React Developer",
    "Next.js Developer",
    "Web Developer Bangladesh",
    "Portfolio",
  ],
  authors: [{ name: "Mehedi Hasan" }],
  creator: "Mehedi Hasan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Mehedi Hasan Portfolio",
    title: "Mehedi Hasan | WordPress & Frontend Developer",
    description:
      "Mehedi Hasan is a WordPress and Frontend Developer specializing in WordPress, Elementor, React and Next.js.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehedi Hasan | WordPress & Frontend Developer",
    description:
      "Mehedi Hasan is a WordPress and Frontend Developer specializing in WordPress, Elementor, React and Next.js.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--primary)]/20">
        <AppProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}

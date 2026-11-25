import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/providers";
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
  description: "WordPress & Frontend Developer specializing in modern web development, Next.js, React, and bespoke WordPress solutions.",
  keywords: [
    "Mehedi Hasan",
    "WordPress Developer",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "Web Developer",
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
    description: "WordPress & Frontend Developer specializing in modern web development, Next.js, React, and bespoke WordPress solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehedi Hasan | WordPress & Frontend Developer",
    description: "WordPress & Frontend Developer specializing in modern web development, Next.js, React, and bespoke WordPress solutions.",
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
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

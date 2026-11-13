import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Replace with the real public domain (https, no trailing slash) — WhatsApp
// needs an absolute image URL, built from this.
const SITE_URL = "https://aruldevita.binzo.id";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "NIKAHFIX",
  description: "You're invited to the next episode of our love story.",
  openGraph: {
    title: "NIKAHFIX",
    description: "You're invited to the next episode of our love story.",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-black text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

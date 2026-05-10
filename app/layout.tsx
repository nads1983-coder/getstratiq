import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://leadwithnadine.com"),
  title: {
    default: "LeadWithNadine | Communication Clarity for Frontline Leaders",
    template: "%s | LeadWithNadine",
  },
  description:
    "LeadWithNadine is Nadine Pierre's communication clarity platform for frontline leaders who want to stop overexplaining, handle difficult conversations, and lead with calm authority.",
  alternates: { canonical: "/" },
  keywords: [
    "LeadWithNadine", "Lead With Nadine", "Nadine Pierre", "communication clarity platform", "communication intelligence",
    "communication clarity", "frontline leadership communication", "calm authority leadership", "security leadership",
    "difficult conversations leadership", "stop overexplaining", "leadership communication", "confident communication for leaders",
  ],
  authors: [{ name: "Nadine Pierre", url: "https://leadwithnadine.com" }],
  creator: "Nadine Pierre",
  publisher: "LeadWithNadine",
  openGraph: {
    title: "LeadWithNadine | Communication Clarity for Frontline Leaders",
    description: "Stop overexplaining. Rewrite with clarity. Lead with calm authority under real-world pressure.",
    url: "https://leadwithnadine.com",
    siteName: "LeadWithNadine",
    type: "website",
    locale: "en_GB",
    images: [{ url: "/stop-overexplaining-guide-cover.jpg", width: 768, height: 1152, alt: "LeadWithNadine Stop Overexplaining leadership guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadWithNadine | Communication Clarity for Frontline Leaders",
    description: "Communication clarity for frontline leaders who want to stop overexplaining and lead with calm authority.",
    images: ["/stop-overexplaining-guide-cover.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB"><body>{children}</body></html>;
}

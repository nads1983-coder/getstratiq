import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://getstratiq.co"),
  title: {
    default: "STRATIQ | Free AI Strategic Reasoning for Better Judgement",
    template: "%s | STRATIQ",
  },
  description:
    "STRATIQ is a free AI strategic reasoning engine that helps professionals improve judgement, communicate better, decide better, assess risk, and think clearly under pressure.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "AI strategic reasoning tool",
    "AI decision-making tool",
    "AI judgement engine",
    "communication analysis AI",
    "difficult conversation AI tool",
    "leadership communication tool",
    "strategic reasoning AI",
    "risk assessment AI",
    "think clearly under pressure",
    "behavioural analysis AI",
    "conflict communication tool",
    "professional decision support AI",
  ],
  authors: [{ name: "STRATIQ", url: "https://getstratiq.co" }],
  creator: "STRATIQ",
  publisher: "STRATIQ",
  openGraph: {
    title: "STRATIQ | Think Clearly Under Pressure",
    description:
      "Free AI strategic reasoning for professionals who need better judgement, clearer communication, stronger decisions, and sharper risk awareness.",
    url: "https://getstratiq.co",
    siteName: "STRATIQ",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "STRATIQ AI strategic reasoning platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STRATIQ | Free AI Strategic Reasoning",
    description:
      "Improve judgement, communication, decision clarity, and risk awareness under pressure.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4B1F6F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}

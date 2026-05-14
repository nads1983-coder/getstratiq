import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://getstratiq.co"),
  title: {
    default: "STRATIQ | Free AI Strategic Reasoning Tool",
    template: "%s | STRATIQ"
  },
  description:
    "Free AI strategic reasoning tool for clearer decisions, risk assessment, option comparison, and communication under pressure.",
  keywords: [
    "STRATIQ",
    "free AI strategic reasoning tool",
    "AI strategic reasoning",
    "AI decision-making tool",
    "risk assessment AI",
    "option comparison AI",
    "decision clarity",
    "strategic judgement",
    "communication under pressure",
    "professional reasoning",
    "clearer decisions"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "STRATIQ | Free AI Strategic Reasoning Tool",
    description:
      "Free AI strategic reasoning for clearer decisions, risk assessment, option comparison, and communication under pressure.",
    url: "https://getstratiq.co",
    siteName: "STRATIQ",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "https://getstratiq.co/og-image.png",
        width: 1200,
        height: 630,
        alt: "STRATIQ strategic reasoning for difficult decisions",
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "STRATIQ | Free AI Strategic Reasoning Tool",
    description:
      "Analyse decisions, risks, options, trade-offs, and communication with calm strategic clarity.",
    images: ["https://getstratiq.co/og-image.png"]
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <head>
        {/* Privacy-friendly analytics by Plausible */}
        <script async src="https://plausible.io/js/pa-ip8Ajlgt7zt_6ukItyoRc.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()"
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

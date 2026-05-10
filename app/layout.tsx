import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://getstratiq.co"),
  title: {
    default: "STRATIQ | Free AI Strategic Reasoning",
    template: "%s | STRATIQ"
  },
  description:
    "STRATIQ is a free AI strategic reasoning tool for clearer judgement, sharper communication, better decisions, and stronger risk awareness under pressure.",
  keywords: [
    "STRATIQ",
    "AI strategic reasoning",
    "decision clarity",
    "risk assessment",
    "strategic judgement",
    "communication clarity",
    "professional reasoning"
  ],
  openGraph: {
    title: "STRATIQ | Think Clearly Under Pressure",
    description:
      "Free AI strategic reasoning for professionals who need calmer judgement, clearer trade-offs, and practical next steps.",
    url: "https://getstratiq.co",
    siteName: "STRATIQ",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "STRATIQ | Free AI Strategic Reasoning",
    description:
      "Analyse situations, options, risks, trade-offs, and wording with calm strategic clarity."
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}

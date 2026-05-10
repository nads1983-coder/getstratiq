import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: "https://leadwithnadine.com/", lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: "https://leadwithnadine.com/thank-you", lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}

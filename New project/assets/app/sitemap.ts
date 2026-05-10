import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: "https://getstratiq.co/",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://getstratiq.co/thank-you",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}

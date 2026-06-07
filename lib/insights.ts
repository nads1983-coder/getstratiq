import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export type InsightArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  date: string;
  readingTime: string;
  articleType: string;
  targetKeyword: string;
  tags: string[];
  cta?: string;
  body: string;
  source: "manual" | "generated";
};

type GeneratedInsightArticle = {
  slug?: string;
  title?: string;
  seoTitle?: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt?: string;
  description?: string;
  date?: string;
  publishedDate?: string;
  readingTime?: string;
  readingTimeMinutes?: number;
  articleType?: string;
  targetKeyword?: string;
  tags?: string[];
  keywordVariations?: string[];
  cta?: string;
  content?: string;
  body?: string;
  articleMarkdown?: string;
};

const contentDirectory = path.join(process.cwd(), "content", "insights");

const manualInsights: InsightArticle[] = [
  {
    slug: "why-most-businesses-have-a-growth-problem-not-a-marketing-problem",
    title: "Why Most Businesses Have a Growth Problem, Not a Marketing Problem",
    seoTitle: "Why Most Businesses Have a Growth Problem, Not a Marketing Problem | GetStratiq",
    metaDescription:
      "Most businesses blame marketing when growth slows. In reality, the problem is often strategy, positioning and execution. Here's how to identify the real bottleneck.",
    excerpt:
      "Most businesses blame marketing when growth slows. In reality, the problem is often strategy, positioning and execution.",
    date: "2026-05-16T08:00:00.000Z",
    readingTime: "5 min read",
    articleType: "Strategic Growth",
    targetKeyword: "growth problem",
    tags: ["Strategy", "Growth", "Decision making"],
    body: "",
    source: "manual",
  },
];

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

function toGeneratedInsight(raw: GeneratedInsightArticle): InsightArticle | null {
  if (!raw.slug || !raw.title) return null;

  const body = raw.articleMarkdown || raw.content || raw.body || "";
  if (!body.trim()) return null;

  const tags = Array.isArray(raw.tags)
    ? raw.tags
    : Array.isArray(raw.keywordVariations)
      ? raw.keywordVariations
      : [];

  return {
    slug: raw.slug,
    title: raw.title,
    seoTitle: raw.seoTitle || raw.metaTitle || raw.title,
    metaDescription: raw.metaDescription || raw.description || raw.excerpt || raw.title,
    excerpt: raw.excerpt || raw.description || raw.metaDescription || "",
    date: raw.publishedDate || raw.date || new Date().toISOString(),
    readingTime:
      raw.readingTime ||
      (raw.readingTimeMinutes ? `${raw.readingTimeMinutes} min read` : estimateReadingTime(body)),
    articleType: raw.articleType || "Insight Article",
    targetKeyword: raw.targetKeyword || tags[0] || "",
    tags,
    cta: raw.cta,
    body,
    source: "generated",
  };
}

export function getGeneratedInsights() {
  if (!existsSync(contentDirectory)) return [];

  return readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".json"))
    .flatMap((file) => {
      try {
        const raw = readFileSync(path.join(contentDirectory, file), "utf8");
        const article = toGeneratedInsight(JSON.parse(raw) as GeneratedInsightArticle);
        return article ? [article] : [];
      } catch {
        return [];
      }
    });
}

export function getAllInsights() {
  const generatedInsights = getGeneratedInsights();
  const generatedSlugs = new Set(generatedInsights.map((article) => article.slug));

  return [
    ...generatedInsights,
    ...manualInsights.filter((article) => !generatedSlugs.has(article.slug)),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getGeneratedInsightBySlug(slug: string) {
  return getGeneratedInsights().find((article) => article.slug === slug) || null;
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGeneratedInsightBySlug, getGeneratedInsights } from "../../../lib/insights";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return <span key={index}>{part}</span>;
  });
}

function ArticleBody({ markdown }: { markdown: string }) {
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (!listItems.length) return;

    blocks.push(
      <ul key={`list-${blocks.length}`}>
        {listItems.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  markdown.split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      return;
    }

    if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
      return;
    }

    flushList();

    if (line.startsWith("### ")) {
      blocks.push(<h3 key={`h3-${blocks.length}`}>{renderInline(line.slice(4))}</h3>);
      return;
    }

    if (line.startsWith("## ")) {
      blocks.push(<h2 key={`h2-${blocks.length}`}>{renderInline(line.slice(3))}</h2>);
      return;
    }

    blocks.push(<p key={`p-${blocks.length}`}>{renderInline(line)}</p>);
  });

  flushList();

  return <>{blocks}</>;
}

export function generateStaticParams() {
  return getGeneratedInsights().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getGeneratedInsightBySlug(slug);

  if (!article) return {};

  return {
    title: article.seoTitle,
    description: article.metaDescription,
    alternates: { canonical: `https://getstratiq.co/insights/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.seoTitle,
      description: article.metaDescription,
      url: `https://getstratiq.co/insights/${article.slug}`,
      siteName: "GetStratiq",
      publishedTime: article.date,
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.metaDescription,
    },
  };
}

export default async function GeneratedInsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const article = getGeneratedInsightBySlug(slug);

  if (!article) notFound();

  return (
    <main className="article-page">
      <article className="article-container">
        <Link href="/insights" className="eyebrow">
          STRATIQ Insights
        </Link>

        <h1>{article.title}</h1>

        <p className="article-intro">{article.excerpt}</p>

        <div className="article-meta">
          <span>
            {new Intl.DateTimeFormat("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(article.date))}
          </span>
          <span>{article.readingTime}</span>
          {article.targetKeyword ? <span>{article.targetKeyword}</span> : null}
        </div>

        {article.tags.length ? (
          <div className="article-tags">
            {article.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        ) : null}

        <ArticleBody markdown={article.body} />

        {article.cta ? (
          <section className="article-cta">
            <p className="eyebrow">Next step</p>
            <h2>{article.cta}</h2>
            <p>
              Use this insight to clarify the next decision, constraint or trade-off in front of you.
            </p>
            <Link href="/#stratiq-tool">Use STRATIQ</Link>
          </section>
        ) : null}
      </article>
    </main>
  );
}

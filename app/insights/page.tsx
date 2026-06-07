import Link from "next/link";
import { getAllInsights } from "../../lib/insights";

export const metadata = {
  title: "Insights | GetStratiq",
  description: "Strategic thinking, business judgement and decision-making insights from GetStratiq."
};

export default function InsightsPage() {
  const articles = getAllInsights();

  return (
    <main className="article-page">
      <section className="article-container">
        <p className="eyebrow">STRATIQ Insights</p>
        <h1>Insights for clearer strategic judgement.</h1>
        <p className="article-intro">
          Practical thinking for founders, operators and leaders who need sharper decisions under pressure.
        </p>

        <div className="insight-list">
          {articles.map((article) => (
            <Link key={article.slug} href={`/insights/${article.slug}`}>
              <article className="insight-card">
                <p className="eyebrow">{article.articleType}</p>
                <h2>{article.title}</h2>
                <p>{article.excerpt}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

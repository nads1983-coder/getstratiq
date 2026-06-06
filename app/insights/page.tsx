import Link from "next/link";

export const metadata = {
  title: "Insights | GetStratiq",
  description: "Strategic thinking, business judgement and decision-making insights from GetStratiq."
};

export default function InsightsPage() {
  return (
    <main className="article-page">
      <section className="article-container">
        <p className="eyebrow">STRATIQ Insights</p>
        <h1>Insights for clearer strategic judgement.</h1>
        <p className="article-intro">
          Practical thinking for founders, operators and leaders who need sharper decisions under pressure.
        </p>

        <div className="insight-list">
          <Link href="/insights/why-most-businesses-have-a-growth-problem-not-a-marketing-problem">
            <article className="insight-card">
              <p className="eyebrow">Strategic Growth</p>
              <h2>Why Most Businesses Have a Growth Problem, Not a Marketing Problem</h2>
              <p>
                Most businesses blame marketing when growth slows. In reality, the problem is often strategy, positioning and execution.
              </p>
            </article>
          </Link>
        </div>
      </section>
    </main>
  );
}

"use client";

import { FormEvent, useMemo, useState } from "react";

const donationUrl = "https://donate.stripe.com/4gM5kD9d4bMr8PealF33W05";

const prompts = [
  "A supplier is underperforming and the client is becoming impatient. Should I escalate or handle it directly?",
  "I need to move someone off a site without inflaming the relationship between contractor, client, and team.",
  "A stakeholder is pushing for speed, but I can see operational risk that has not been acknowledged."
];

const navItems = ["Analyse", "Risk", "Options", "Wording"];
const expectedSections = [
  "Situation summary",
  "Strategic interpretation",
  "Options",
  "Risk assessment",
  "Recommended move",
  "Suggested wording",
  "Next step"
];

type BriefSection = {
  title: string;
  body: string;
};

type IconName = "analyse" | "risk" | "options" | "wording" | "support" | "status";

function ShieldMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      S
    </span>
  );
}

function Icon({ name }: { name: IconName }) {
  const common = "h-4 w-4";
  if (name === "risk") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 4 21 20H3L12 4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M12 9v5M12 17.5h.01" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "options") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 7h14M5 12h10M5 17h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="m16 15 2 2 3-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "wording") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H10l-5 4V6.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M8.5 8h7M8.5 11h4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "support") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 20s-7-4.35-7-10.25A3.75 3.75 0 0 1 11.4 7.1L12 8l.6-.9A3.75 3.75 0 0 1 19 9.75C19 15.65 12 20 12 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "status") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="m8.5 12.3 2.2 2.2 4.9-5.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l1.9 5.3L19 10l-5.1 1.7L12 17l-1.9-5.3L5 10l5.1-1.7L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M18 16l.7 1.8 1.8.7-1.8.7L18 21l-.7-1.8-1.8-.7 1.8-.7L18 16Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function parseBrief(text: string): BriefSection[] {
  if (!text.trim()) return [];

  const escaped = expectedSections.map((section) => section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(?:^|\\n)\\s*(?:#{1,3}\\s*)?(${escaped.join("|")})\\s*:?\\s*`, "gi");
  const matches = [...text.matchAll(pattern)];

  if (!matches.length) {
    return [{ title: "STRATIQ brief", body: text.trim() }];
  }

  return matches
    .map((match, index) => {
      const title = match[1].trim();
      const start = (match.index || 0) + match[0].length;
      const end = index + 1 < matches.length ? matches[index + 1].index || text.length : text.length;
      return {
        title,
        body: text.slice(start, end).replace(/^[-:\s]+/, "").trim()
      };
    })
    .filter((section) => section.body);
}

function navIconName(item: string): IconName {
  if (item === "Risk") return "risk";
  if (item === "Options") return "options";
  if (item === "Wording") return "wording";
  return "analyse";
}

export default function Home() {
  const [situation, setSituation] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sections = useMemo(() => parseBrief(result), [result]);
  const characterCount = situation.trim().length;

  async function analyse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/stratiq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "STRATIQ could not analyse this yet.");
      }

      setResult(data.result);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://getstratiq.co/#organization",
        name: "STRATIQ",
        url: "https://getstratiq.co",
        description:
          "STRATIQ is a free AI strategic reasoning tool for clearer decisions, risk assessment, option comparison, and communication under pressure."
      },
      {
        "@type": "WebSite",
        "@id": "https://getstratiq.co/#website",
        name: "STRATIQ",
        url: "https://getstratiq.co",
        publisher: { "@id": "https://getstratiq.co/#organization" },
        inLanguage: "en-GB"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://getstratiq.co/#app",
        name: "STRATIQ",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://getstratiq.co",
        offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
        description:
          "Free AI strategic reasoning for clearer decisions, risk assessment, option comparison, and professional communication under pressure."
      }
    ]
  };

  return (
    <main className="app-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <aside className="sidebar" aria-label="STRATIQ navigation">
        <a href="#workspace" className="brand-lockup" aria-label="STRATIQ home">
          <ShieldMark />
          <span>
            <strong>STRATIQ</strong>
            <small>Reasoning engine</small>
          </span>
        </a>

        <nav className="side-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item} href="#workspace" className={item === "Analyse" ? "active" : ""}>
              <Icon name={navIconName(item)} />
              {item}
            </a>
          ))}
        </nav>

        <div className="sidebar-card">
          <p>Free access</p>
          <span>Strategic clarity without accounts, gates, or pressure.</span>
        </div>

        <a href={donationUrl} target="_blank" rel="noreferrer" className="support-link">
          <Icon name="support" />
          Support STRATIQ
        </a>
      </aside>

      <section className="workspace" id="workspace">
        <header className="topbar">
          <a href="#workspace" className="mobile-brand" aria-label="STRATIQ home">
            <ShieldMark />
            <span>STRATIQ</span>
          </a>
          <div className="topbar-copy">
            <p>Strategic reasoning for pressure, risk, options, and communication.</p>
          </div>
          <a href={donationUrl} target="_blank" rel="noreferrer" className="topbar-support">
            Support
          </a>
        </header>

        <div className="workspace-grid">
          <section className="command-panel" aria-labelledby="tool-title">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Free AI strategic reasoning</p>
                <h1 id="tool-title">Think clearly before you move.</h1>
              </div>
              <div className="system-status" aria-label="System status">
                <Icon name="status" />
                Online
              </div>
            </div>

            <p className="tool-intro">
              Enter a situation, decision, risk, or difficult message. STRATIQ returns a structured brief built around judgement, trade-offs, and next action.
            </p>

            <form onSubmit={analyse} className="analysis-form">
              <label className="input-label" htmlFor="situation">
                Situation / decision / risk
              </label>
              <textarea
                id="situation"
                value={situation}
                onChange={(event) => setSituation(event.target.value)}
                rows={12}
                placeholder="Describe what is happening, what decision is needed, who is involved, and where the risk or pressure sits."
                className="situation-input"
              />

              <div className="form-meta">
                <span>{characterCount ? `${characterCount} characters` : "Minimum useful context: 2-4 sentences"}</span>
                <span>Private server-side analysis</span>
              </div>

              <button type="submit" disabled={loading || characterCount < 20} className="primary-action">
                {loading ? <span className="spinner" aria-hidden="true" /> : <Icon name="analyse" />}
                {loading ? "Analysing..." : "Analyse with STRATIQ"}
              </button>
            </form>

            <div className="prompt-strip" aria-label="Example prompts">
              {prompts.map((prompt) => (
                <button key={prompt} type="button" onClick={() => setSituation(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          </section>

          <section className="brief-panel" aria-live="polite" aria-label="STRATIQ analysis result">
            <div className="brief-header">
              <div>
                <p className="eyebrow">STRATIQ brief</p>
                <h2>Structured clarity</h2>
              </div>
              <span>{sections.length ? `${sections.length} sections` : "Ready"}</span>
            </div>

            {error ? (
              <div className="error-card" role="alert">
                <strong>Analysis unavailable</strong>
                <p>{error}</p>
              </div>
            ) : null}

            {loading ? (
              <div className="loading-stack" aria-label="STRATIQ is analysing">
                {["Interpreting dynamics", "Comparing options", "Assessing risk", "Preparing wording"].map((item) => (
                  <div key={item} className="loading-row">
                    <span />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {!loading && !error && !sections.length ? (
              <div className="empty-state">
                <div className="empty-orbit">
                  <ShieldMark />
                </div>
                <h2>Ready for the situation that needs judgement.</h2>
                <p>
                  STRATIQ will separate signal from noise, compare practical routes, assess risk, and give you wording you can actually use.
                </p>
                <div className="section-preview" aria-hidden="true">
                  {expectedSections.slice(0, 5).map((section) => (
                    <span key={section}>{section}</span>
                  ))}
                </div>
              </div>
            ) : null}

            {!loading && sections.length ? (
              <div className="brief-sections">
                {sections.map((section, index) => (
                  <article key={`${section.title}-${index}`} className="brief-card">
                    <span className="brief-index">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{section.title}</h3>
                      <p>{section.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </section>
        </div>

        <section className="insight-rail" aria-label="STRATIQ method">
          <article>
            <span>01</span>
            <h2>Clarify the signal</h2>
            <p>Separate facts, assumptions, pressure, and noise before reacting.</p>
          </article>
          <article>
            <span>02</span>
            <h2>Map the risk</h2>
            <p>Assess operational, communication, relationship, reputation, and escalation risk.</p>
          </article>
          <article>
            <span>03</span>
            <h2>Choose the move</h2>
            <p>Compare routes and leave with one immediate professional next step.</p>
          </article>
        </section>

        <footer className="app-footer">
          <span>STRATIQ remains free to use.</span>
          <a href={donationUrl} target="_blank" rel="noreferrer">
            Support STRATIQ
          </a>
        </footer>
      </section>
    </main>
  );
}

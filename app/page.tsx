"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "./analytics";

const donationUrl = "https://donate.stripe.com/4gM5kD9d4bMr8PealF33W05";

const prompts = [
  "A supplier is underperforming and the client is becoming impatient. Should I escalate or handle it directly?",
  "I need to move someone off a site without inflaming the relationship between contractor, client, and team.",
  "A stakeholder is pushing for speed, but I can see operational risk that has not been acknowledged."
];

const navItems = ["Analysis", "Risk", "Options", "Wording"];

const builtFor = [
  "Strategic decisions",
  "Risk assessment",
  "Difficult conversations",
  "Business judgement",
  "Leadership thinking",
  "Next-step planning"
];

const stratiqMethod = [
  {
    title: "Strategic Clarity",
    items: ["Situation", "Objective", "Constraint", "Decision"]
  },
  {
    title: "Risk Lens",
    items: ["What could go wrong", "What is likely", "What matters most", "What needs mitigation"]
  },
  {
    title: "Executive Reasoning",
    items: ["Signal", "Trade-off", "Recommendation", "Next move"]
  }
];

const productModes = [
  {
    title: "Analysis",
    icon: "analyse" as IconName,
    summary:
      "Break down what is actually happening, separate facts from assumptions, and identify what matters most before you act.",
    steps: [
      "Clarify the decision you are trying to make",
      "Identify what you know versus what you are assuming",
      "Remove noise from the situation"
    ]
  },
  {
    title: "Risk",
    icon: "risk" as IconName,
    summary:
      "Identify what could go wrong, what is uncertain, and where you may be moving too quickly.",
    steps: [
      "Look for missing information",
      "Check whether urgency is genuine",
      "Consider the likely outcome if nothing changes"
    ]
  },
  {
    title: "Options",
    icon: "options" as IconName,
    summary:
      "Pressure-test your possible next moves and understand which option gives you the most clarity, control, and flexibility.",
    steps: [
      "Compare the safest move against the fastest move",
      "Avoid deciding from pressure alone",
      "Choose the option that preserves clarity and control"
    ]
  },
  {
    title: "Wording",
    icon: "wording" as IconName,
    summary:
      "Turn your next move into clear, calm, usable wording so you can communicate without overexplaining.",
    steps: [
      "Keep the message short",
      "Ask for the missing information directly",
      "Avoid emotional or defensive wording"
    ]
  }
];

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
  if (item === "Analysis") return "analyse";
  if (item === "Options") return "options";
  if (item === "Wording") return "wording";
  return "analyse";
}

function readStoredPlanType() {
  if (typeof window === "undefined") return "free";

  try {
    return (
      window.localStorage.getItem("stratiq_plan_type") ||
      window.localStorage.getItem("plan_type") ||
      window.localStorage.getItem("stratiqPlan") ||
      "free"
    );
  } catch {
    return "free";
  }
}

function readRemainingRuns() {
  if (typeof window === "undefined") return null;

  let storedValue: string | null = null;

  try {
    storedValue =
      window.localStorage.getItem("stratiq_runs_remaining") ||
      window.localStorage.getItem("runs_remaining") ||
      window.localStorage.getItem("remainingRuns");
  } catch {
    return null;
  }

  if (storedValue === null) return null;

  const parsed = Number.parseInt(storedValue, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function readSessionFlag(key: string) {
  if (typeof window === "undefined") return false;

  try {
    return window.sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function writeSessionFlag(key: string) {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(key, "1");
  } catch {
    // Tracking de-duplication should not affect the product flow.
  }
}

export default function Home() {
  const [situation, setSituation] = useState("");
  const [analysisSituation, setAnalysisSituation] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeMode, setActiveMode] = useState(productModes[0].title);
  const [shareStatus, setShareStatus] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState("");
  const toolStartedTracked = useRef(false);

  const sections = useMemo(() => parseBrief(result), [result]);
  const characterCount = situation.trim().length;
  const activeModeDetails = productModes.find((mode) => mode.title === activeMode) || productModes[0];
  const sectionByTitle = (title: string) =>
    sections.find((section) => section.title.toLowerCase() === title.toLowerCase())?.body || "";
  const keyRecommendation = sectionByTitle("Recommended move") || sectionByTitle("Strategic interpretation");
  const mainRisk = sectionByTitle("Risk assessment") || sectionByTitle("Options");
  const nextBestAction = sectionByTitle("Next step");
  const summaryText = [
    "STRATIQ analysis summary",
    "",
    `Situation: ${analysisSituation || situation.trim()}`,
    "",
    `Key recommendation: ${keyRecommendation || "Review the full STRATIQ analysis for the recommended move."}`,
    "",
    `Main risk: ${mainRisk || "Review the full STRATIQ analysis for the risk assessment."}`,
    "",
    `Next best action: ${nextBestAction || "Review the full STRATIQ analysis for the next step."}`,
    "",
    "Generated by STRATIQ"
  ].join("\n");

  function trackToolStarted() {
    if (toolStartedTracked.current) return;

    toolStartedTracked.current = true;
    if (readSessionFlag("stratiq_tool_started_tracked")) return;
    writeSessionFlag("stratiq_tool_started_tracked");

    trackEvent("Tool Started");
  }

  function trackRunsIfExhausted() {
    const remainingRuns = readRemainingRuns();
    if (remainingRuns !== 0 || typeof window === "undefined") return;

    const lastPlanType = readStoredPlanType();
    if (!readSessionFlag("stratiq_runs_exhausted_tracked")) {
      writeSessionFlag("stratiq_runs_exhausted_tracked");
      trackEvent("Runs Exhausted", { last_plan_type: lastPlanType });
    }

    if (!readSessionFlag("stratiq_rebuy_prompt_viewed_tracked")) {
      writeSessionFlag("stratiq_rebuy_prompt_viewed_tracked");
      trackEvent("Rebuy Prompt Viewed");
    }
  }

  function trackSupportClick(selectedPlan = "support") {
    trackEvent("Plan Selected", { selected_plan: selectedPlan });
    trackEvent("Support Clicked", { selected_plan: selectedPlan });
    trackEvent("Donation Clicked");
    trackEvent("Stripe Redirect", { plan_type: selectedPlan, destination: donationUrl });
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("paid") === "true") {
      const planType = params.get("plan_type") || params.get("plan") || readStoredPlanType();
      const runsAdded = Number.parseInt(params.get("runs_added") || params.get("runsAdded") || "0", 10);
      const paymentKey = `stratiq_payment_confirmed_${window.location.pathname}_${window.location.search}`;

      if (!readSessionFlag(paymentKey)) {
        writeSessionFlag(paymentKey);
        trackEvent("Payment Confirmed", {
          plan_type: planType,
          runs_added: Number.isFinite(runsAdded) ? runsAdded : 0
        });
      }
    }

    trackRunsIfExhausted();
  }, []);

  async function copyText(text: string, status: string) {
    await navigator.clipboard.writeText(text);
    setShareStatus(status);
  }

  async function copySummary() {
    await copyText(summaryText, "Summary copied");
  }

  async function copyFullAnalysis() {
    await copyText(result, "Full analysis copied");
  }

  async function shareResult() {
    if (navigator.share) {
      await navigator.share({
        title: "STRATIQ analysis summary",
        text: summaryText
      });
      setShareStatus("Share opened");
      return;
    }

    await copyText(summaryText, "Summary copied");
  }

  function submitFeedback(rating: "up" | "down") {
    trackEvent("Feedback Submitted", {
      rating,
      has_comment: false
    });
    setFeedbackStatus("Feedback noted");
  }

  async function analyse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const currentSituation = situation.trim();
    const planType = readStoredPlanType();
    const remainingRuns = readRemainingRuns();
    const hasRunsRemaining = remainingRuns === null ? true : remainingRuns > 0;

    trackEvent("Analysis Submitted", {
      input_length: currentSituation.length,
      has_runs_remaining: hasRunsRemaining,
      plan_type: planType
    });

    setLoading(true);
    setError("");
    setResult("");
    setShareStatus("");
    setFeedbackStatus("");
    setAnalysisSituation(currentSituation);

    try {
      const response = await fetch("/api/stratiq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation: currentSituation })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "STRATIQ could not analyse this yet.");
      }

      const generatedSections = parseBrief(data.result);
      setResult(data.result);
      trackEvent("Analysis Completed", {
        plan_type: planType,
        sections_generated: generatedSections.length,
        confidence_level: generatedSections.length >= expectedSections.length ? "high" : "medium"
      });
      trackRunsIfExhausted();
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
            <a
              key={item}
              href="#workspace"
              className={item === activeMode ? "active" : ""}
              onClick={() => trackEvent("Mode Selected", { mode_name: item })}
            >
              <Icon name={navIconName(item)} />
              {item}
            </a>
          ))}
        </nav>

        <div className="sidebar-card">
          <p>Free access</p>
          <span>Strategic clarity without accounts, gates, or pressure.</span>
        </div>

        <a href={donationUrl} target="_blank" rel="noreferrer" className="support-link" onClick={() => trackSupportClick()}>
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
          <a href={donationUrl} target="_blank" rel="noreferrer" className="topbar-support" onClick={() => trackSupportClick()}>
            Support
          </a>
        </header>

        <div className="workspace-grid">
          <section className="command-panel" aria-labelledby="tool-title">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Free AI strategic reasoning</p>
                <h1 id="tool-title">Think clearer before you act.</h1>
              </div>
              <div className="system-status" aria-label="System status">
                <Icon name="status" />
                Online
              </div>
            </div>

            <p className="tool-intro">
              Use STRATIQ to analyse decisions, risks, difficult conversations, and strategic next moves with structured reasoning.
            </p>

            <div className="built-for-row" aria-label="Built for">
              <span>Built for</span>
              {builtFor.map((item) => (
                <strong key={item}>{item}</strong>
              ))}
            </div>

            <section className="mode-panel" aria-labelledby="mode-title">
              <div className="mode-heading">
                <div>
                  <p className="eyebrow">Reasoning modes</p>
                  <h2 id="mode-title">Choose the lens STRATIQ should sharpen.</h2>
                </div>
                <span>{activeModeDetails.title}</span>
              </div>

              <div className="mode-grid" role="tablist" aria-label="STRATIQ reasoning sections">
                {productModes.map((mode) => (
                  <button
                    key={mode.title}
                    type="button"
                    role="tab"
                    aria-selected={activeMode === mode.title}
                    aria-controls="mode-detail"
                    className={activeMode === mode.title ? "mode-card active" : "mode-card"}
                    onClick={() => {
                      setActiveMode(mode.title);
                      trackEvent("Mode Selected", { mode_name: mode.title });
                    }}
                  >
                    <Icon name={mode.icon} />
                    <span>{mode.title}</span>
                  </button>
                ))}
              </div>

              <article id="mode-detail" className="mode-detail" role="tabpanel">
                <h3>{activeModeDetails.title}</h3>
                <p>{activeModeDetails.summary}</p>
                <ul>
                  {activeModeDetails.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </article>
            </section>

            <form onSubmit={analyse} className="analysis-form">
              <label className="input-label" htmlFor="situation">
                Situation / decision / risk
              </label>
              <textarea
                id="situation"
                value={situation}
                onFocus={trackToolStarted}
                onChange={(event) => {
                  if (!situation.length && event.target.value.length) trackToolStarted();
                  setSituation(event.target.value);
                }}
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
                {loading ? "Analysing..." : "Start an analysis"}
              </button>
            </form>

            <div className="prompt-strip" aria-label="Example prompts">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    setSituation(prompt);
                    trackToolStarted();
                    trackEvent("Example Scenario Clicked", { scenario_name: prompt });
                  }}
                >
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
              <>
                <article className="share-card" aria-label="Shareable STRATIQ summary">
                  <div className="share-card-header">
                    <ShieldMark />
                    <div>
                      <p className="eyebrow">Shareable summary</p>
                      <h3>STRATIQ decision brief</h3>
                    </div>
                  </div>
                  <dl className="summary-grid">
                    <div>
                      <dt>Situation</dt>
                      <dd>{analysisSituation}</dd>
                    </div>
                    <div>
                      <dt>Key recommendation</dt>
                      <dd>{keyRecommendation || "Review the full analysis for the recommended move."}</dd>
                    </div>
                    <div>
                      <dt>Main risk</dt>
                      <dd>{mainRisk || "Review the full analysis for the risk assessment."}</dd>
                    </div>
                    <div>
                      <dt>Next best action</dt>
                      <dd>{nextBestAction || "Review the full analysis for the next step."}</dd>
                    </div>
                  </dl>
                  <div className="share-actions" aria-label="Share analysis actions">
                    <button type="button" onClick={copySummary}>Copy summary</button>
                    <button type="button" onClick={copyFullAnalysis}>Copy full analysis</button>
                    <button type="button" onClick={shareResult}>Share result</button>
                    {shareStatus ? <span role="status">{shareStatus}</span> : null}
                  </div>
                  <div className="feedback-actions" aria-label="Analysis feedback">
                    <span>Was this useful?</span>
                    <button type="button" onClick={() => submitFeedback("up")} aria-label="Helpful analysis">
                      Yes
                    </button>
                    <button type="button" onClick={() => submitFeedback("down")} aria-label="Unhelpful analysis">
                      No
                    </button>
                    {feedbackStatus ? <strong role="status">{feedbackStatus}</strong> : null}
                  </div>
                </article>

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
              </>
            ) : null}
          </section>
        </div>

        <section className="method-section" aria-labelledby="method-title">
          <div className="method-heading">
            <p className="eyebrow">The STRATIQ Method</p>
            <h2 id="method-title">A sharper operating structure for judgement under pressure.</h2>
          </div>
          <div className="framework-grid">
            {stratiqMethod.map((framework, index) => (
              <article key={framework.title} className="framework-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{framework.title}</h3>
                <ul>
                  {framework.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

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
          <a href="mailto:support@getstratiq.co" className="support-email">
            Support: support@getstratiq.co
          </a>
          <a href={donationUrl} target="_blank" rel="noreferrer" onClick={() => trackSupportClick()}>
            Support STRATIQ
          </a>
        </footer>
      </section>
    </main>
  );
}

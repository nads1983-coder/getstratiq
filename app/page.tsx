"use client";

import { FormEvent, useState } from "react";

const principles = [
  ["Interpret the pressure", "Separate facts, assumptions, incentives, and hidden risks."],
  ["Compare options", "See the trade-offs before committing to a move."],
  ["Communicate clearly", "Turn ambiguity into practical wording and next steps."]
];

const examples = [
  "A difficult conversation with a team member is becoming tense.",
  "I need to decide whether to escalate a client issue.",
  "A stakeholder is pushing for speed, but the risk feels unclear."
];

export default function Home() {
  const [situation, setSituation] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <main>
      <header className="border-b border-line bg-white/90 backdrop-blur">
        <div className="section-shell flex min-h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-3" aria-label="STRATIQ home">
            <span className="grid h-10 w-10 place-items-center rounded-md border border-gold/60 text-plum">
              S
            </span>
            <span className="serif text-2xl font-semibold text-plum">STRATIQ</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-muted md:flex">
            <a href="#tool" className="hover:text-plum">Use STRATIQ</a>
            <a href="#method" className="hover:text-plum">Method</a>
            <a href="#support" className="hover:text-plum">Support</a>
          </nav>
        </div>
      </header>

      <section id="top" className="section-shell grid gap-10 py-12 md:grid-cols-[1.05fr_0.95fr] md:py-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-plum">
            Free AI strategic reasoning
          </p>
          <h1 className="serif mt-5 max-w-3xl text-5xl font-semibold leading-[0.98] text-ink md:text-7xl">
            Think clearly under pressure.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            STRATIQ helps you analyse situations, assess risk, compare options, and choose cleaner wording before the pressure makes the decision for you.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#tool" className="focus-ring inline-flex min-h-12 items-center justify-center rounded-md bg-plum px-7 text-sm font-bold text-white shadow-soft transition hover:bg-[#3d185e]">
              Use STRATIQ
            </a>
            <a href="#method" className="focus-ring inline-flex min-h-12 items-center justify-center rounded-md border border-gold px-7 text-sm font-bold text-plum transition hover:bg-gold/10">
              See the method
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-plum">Reasoning brief</p>
          <div className="mt-5 grid gap-3">
            {["Situation summary", "Strategic interpretation", "Options", "Risk assessment", "Recommended move"].map((item, index) => (
              <div key={item} className="rounded-md border border-line bg-panel p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-sm font-bold text-plum shadow-edge">
                    {index + 1}
                  </span>
                  <p className="font-bold text-ink">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="method" className="section-shell py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map(([title, text]) => (
            <article key={title} className="rounded-lg border border-line bg-white p-6 shadow-edge">
              <h2 className="text-xl font-bold text-ink">{title}</h2>
              <p className="mt-3 leading-7 text-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="tool" className="section-shell py-12 md:py-20">
        <div className="grid gap-6 rounded-lg border border-line bg-white p-5 shadow-soft md:grid-cols-[0.8fr_1.2fr] md:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-plum">Try the reasoning engine</p>
            <h2 className="serif mt-4 text-4xl font-semibold leading-tight text-ink">
              Bring STRATIQ a situation where judgement matters.
            </h2>
            <div className="mt-6 grid gap-3">
              {examples.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setSituation(example)}
                  className="focus-ring rounded-md border border-line bg-panel p-4 text-left text-sm leading-6 text-muted transition hover:border-gold hover:bg-white"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={analyse} className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-ink">Situation</span>
              <textarea
                value={situation}
                onChange={(event) => setSituation(event.target.value)}
                rows={10}
                placeholder="Describe the decision, conflict, pressure point, risk, or conversation you need to think through."
                className="focus-ring min-h-56 resize-y rounded-md border border-line bg-white p-4 leading-7 text-ink shadow-edge"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="focus-ring min-h-12 rounded-md bg-plum px-6 text-sm font-bold text-white transition hover:bg-[#3d185e] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Analysing..." : "Analyse with STRATIQ"}
            </button>
            {error ? <p className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p> : null}
            {result ? (
              <section className="rounded-md border border-line bg-panel p-5">
                <h3 className="text-lg font-bold text-ink">STRATIQ brief</h3>
                <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-7 text-muted">{result}</pre>
              </section>
            ) : null}
          </form>
        </div>
      </section>

      <section id="support" className="section-shell pb-16">
        <div className="rounded-lg border border-line bg-[linear-gradient(135deg,#ffffff,#f8f6fb)] p-7 shadow-soft md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-plum">Free to use</p>
          <h2 className="serif mt-4 text-4xl font-semibold text-ink">No pricing. No performance theatre.</h2>
          <p className="mt-4 max-w-2xl leading-8 text-muted">
            STRATIQ is designed as a practical reasoning tool. It helps you slow the decision down, see the risks, and communicate the next move with clarity.
          </p>
        </div>
      </section>

      <footer className="border-t border-line bg-white">
        <div className="section-shell flex flex-col justify-between gap-4 py-7 text-sm text-muted md:flex-row">
          <p className="font-bold text-plum">STRATIQ</p>
          <p>Free AI reasoning for better judgement.</p>
          <p>&copy; {new Date().getFullYear()} STRATIQ.</p>
        </div>
      </footer>
    </main>
  );
}

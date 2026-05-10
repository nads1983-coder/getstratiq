"use client";

import { useMemo, useState } from "react";
import { Scale, Spark } from "./Icons";

const sample =
  "I need to speak to a senior colleague who keeps bypassing the agreed process and giving instructions directly to my team. It is creating confusion, but I do not want to make it political or damage the relationship.";

const modes = ["Decision clarity", "Communication risk", "Conflict dynamics", "Leadership pressure"];

export function ClarityTool() {
  const [message, setMessage] = useState(sample);
  const [mode, setMode] = useState(modes[0]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const count = useMemo(() => message.trim().length, [message]);

  async function analyseSituation() {
    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/clarity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, mode }),
      });

      const data = (await response.json()) as { result?: string; error?: string };
      if (!response.ok) throw new Error(data.error || "STRATIQ could not analyse this situation.");
      setResult(data.result || "");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[0.94fr_1.06fr]">
      <div className="rounded-lg border border-line bg-white p-4 shadow-edge sm:p-5">
        <div className="mb-4">
          <label htmlFor="situation" className="text-xs font-bold uppercase tracking-[0.16em] text-plum">
            Situation
          </label>
          <p className="mt-2 text-sm leading-6 text-[#706778]">
            Include the context, people involved, pressure point, risk, and outcome you are considering.
          </p>
        </div>

        <textarea
          id="situation"
          value={message}
          maxLength={1800}
          onChange={(event) => setMessage(event.target.value)}
          className="focus-ring min-h-[220px] w-full resize-none rounded-md border border-line bg-[#fbfafc] p-4 text-base leading-7 text-ink placeholder:text-[#91889c] sm:min-h-[250px]"
          placeholder="Describe the situation you need to reason through."
        />

        <div className="mt-4 flex flex-wrap gap-2" aria-label="Reasoning mode">
          {modes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`focus-ring min-h-10 rounded-md border px-3 text-sm font-bold transition ${
                mode === item
                  ? "border-plum bg-plum text-white"
                  : "border-line bg-white text-[#5f5669] hover:border-gold hover:text-plum"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a8093]">{count}/1800</span>
          <button
            type="button"
            onClick={analyseSituation}
            disabled={loading || !message.trim()}
            className="focus-ring inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-plum px-5 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#3d185e] disabled:cursor-not-allowed disabled:opacity-55 sm:flex-none"
          >
            <Spark className="h-4 w-4" />
            {loading ? "Reasoning..." : "Analyse with STRATIQ"}
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-line bg-[#fbfafc] p-4 shadow-edge sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-plum">Reasoning output</p>
            <p className="mt-1 text-sm text-[#706778]">Structured judgement, options, risk, and next move.</p>
          </div>
          <Scale className="hidden h-6 w-6 text-gold sm:block" />
        </div>
        <div className="min-h-[420px] rounded-md border border-line bg-white p-4 sm:p-5">
          {error ? (
            <div className="grid min-h-[360px] place-items-center">
              <p className="max-w-sm text-center text-sm leading-6 text-[#8b2432]">{error}</p>
            </div>
          ) : result ? (
            <div className="prose-output w-full space-y-4 text-sm leading-7 text-ink sm:text-[15px]">
              {result.split("\n").filter(Boolean).map((line) => {
                const isHeading = /^\d+\.\s|^[A-Z][A-Za-z ]+:$/.test(line.trim());
                return (
                  <p key={line} className={isHeading ? "font-bold text-plum" : ""}>
                    {line}
                  </p>
                );
              })}
            </div>
          ) : (
            <div className="grid min-h-[360px] place-items-center text-center">
              <div className="max-w-sm">
                <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-md bg-plum text-white">
                  <Spark className="h-5 w-5" />
                </div>
                <p className="font-semibold text-ink">Your reasoning brief will appear here.</p>
                <p className="mt-2 text-sm leading-6 text-[#746a7f]">
                  Expect a concise read on what matters, what could go wrong, what options exist, and what to do next.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

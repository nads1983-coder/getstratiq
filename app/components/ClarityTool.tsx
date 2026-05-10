"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Spark } from "./Icons";

const sample = "I just wanted to quickly check if maybe we could try to make sure everyone is doing the handover properly, because it has been a bit inconsistent and I do not want anyone to feel like I am being difficult.";
const modes = ["Rewrite With Clarity", "Calm Authority", "Difficult Conversation", "Security Leadership"];
type KeyStatus = "checking" | "missing" | "saved" | "environment";

export function ClarityTool() {
  const [message, setMessage] = useState(sample);
  const [mode, setMode] = useState(modes[0]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [keyStatus, setKeyStatus] = useState<KeyStatus>("checking");
  const [setupOpen, setSetupOpen] = useState(false);
  const [savingKey, setSavingKey] = useState(false);
  const [setupMessage, setSetupMessage] = useState("");
  const count = useMemo(() => message.trim().length, [message]);

  useEffect(() => { void checkKeyStatus(); }, []);

  async function checkKeyStatus() {
    try {
      const response = await fetch("/api/settings/openai-key", { cache: "no-store" });
      const data = (await response.json()) as { configured?: boolean; source?: "environment" | "saved" };
      setKeyStatus(data.configured ? data.source || "saved" : "missing");
      setSetupOpen(!data.configured);
    } catch {
      setKeyStatus("missing");
      setSetupOpen(true);
    }
  }

  async function saveKey(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingKey(true);
    setSetupMessage("");
    try {
      const response = await fetch("/api/settings/openai-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: keyInput }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "The key could not be saved.");
      setKeyInput("");
      setKeyStatus("saved");
      setSetupOpen(false);
      setSetupMessage("OpenAI key saved. The Clarity Tool is ready.");
    } catch (caught) {
      setSetupMessage(caught instanceof Error ? caught.message : "The key could not be saved.");
    } finally {
      setSavingKey(false);
    }
  }

  async function replaceKey() {
    await fetch("/api/settings/openai-key", { method: "DELETE" });
    setKeyInput("");
    setKeyStatus("missing");
    setSetupOpen(true);
    setSetupMessage("Paste the replacement key below.");
  }

  async function refineMessage() {
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
      if (!response.ok) throw new Error(data.error || "The clarity tool could not refine this message.");
      setResult(data.result || "");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const statusCopy = keyStatus === "environment"
    ? "Connected through secure site settings."
    : keyStatus === "saved"
      ? "Connected. Your key is saved securely and hidden."
      : keyStatus === "checking"
        ? "Checking connection..."
        : "Paste your OpenAI key once to activate live rewriting.";

  return (
    <div className="grid gap-4">
      <div className="rounded-lg border border-line bg-[#fbfafc] p-4 shadow-edge sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-plum">Clarity Tool Setup</p>
            <p className="mt-2 text-sm leading-6 text-[#665d70]">{statusCopy}</p>
          </div>
          {keyStatus !== "environment" ? (
            <button type="button" onClick={keyStatus === "saved" ? replaceKey : () => setSetupOpen((value) => !value)} className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-gold px-4 text-sm font-bold text-plum transition hover:bg-gold/10">
              {keyStatus === "saved" ? "Replace API Key" : setupOpen ? "Hide Setup" : "Open Setup"}
            </button>
          ) : null}
        </div>
        {setupOpen && keyStatus !== "environment" ? (
          <form onSubmit={saveKey} className="mt-4 grid gap-3 rounded-md border border-line bg-white p-4">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-ink">OpenAI API key</span>
              <input type="password" value={keyInput} onChange={(event) => setKeyInput(event.target.value)} placeholder="Paste your OpenAI key here" autoComplete="off" className="focus-ring min-h-11 min-w-0 rounded-md border border-line bg-[#fbfafc] px-3 text-sm text-ink" />
            </label>
            <button type="submit" disabled={savingKey || keyInput.trim().length < 20} className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md bg-plum px-5 text-sm font-bold text-white transition hover:bg-[#3d185e] disabled:cursor-not-allowed disabled:opacity-55">
              {savingKey ? "Saving..." : "Save Key"}
            </button>
            <p className="text-xs leading-5 text-[#746a7f]">The key is stored securely and is never shown after saving.</p>
          </form>
        ) : null}
        {setupMessage ? <p className="mt-3 text-sm font-semibold text-plum">{setupMessage}</p> : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-lg border border-line bg-white p-4 shadow-edge sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-plum sm:text-xs sm:tracking-[0.16em]">
            <label htmlFor="message-to-refine">Message to refine</label><span className="shrink-0 text-[11px] text-[#8a8093]">{count}/1200</span>
          </div>
          <textarea id="message-to-refine" value={message} maxLength={1200} onChange={(event) => setMessage(event.target.value)} className="focus-ring min-h-[176px] w-full resize-none rounded-md border border-line bg-[#fbfafc] p-3 text-sm leading-6 text-ink placeholder:text-[#91889c] sm:min-h-[220px] sm:p-4" placeholder="Paste the message you are overexplaining, softening, or avoiding." />
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2" aria-label="Communication mode">
            {modes.map((item) => <button key={item} type="button" onClick={() => setMode(item)} className={`focus-ring min-h-10 rounded-md border px-3 text-sm font-bold transition ${mode === item ? "border-plum bg-plum text-white" : "border-line bg-white text-[#5f5669] hover:border-gold hover:text-plum"}`}>{item}</button>)}
          </div>
          <button type="button" onClick={refineMessage} disabled={loading || !message.trim()} className="focus-ring mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-plum px-5 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#3d185e] disabled:cursor-not-allowed disabled:opacity-55">
            <Spark className="h-4 w-4" />{loading ? "Rewriting..." : "Rewrite with clarity"}
          </button>
        </div>
        <div className="rounded-lg border border-line bg-[#fbfafc] p-4 shadow-edge sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-plum sm:text-xs sm:tracking-[0.16em]"><span>Clearer version</span><span className="shrink-0 text-[11px] text-[#8a8093]">Calm authority</span></div>
          <div className="grid min-h-[260px] place-items-center rounded-md border border-line bg-white p-4 sm:min-h-[336px] sm:p-5">
            {error ? <p className="max-w-sm text-center text-sm leading-6 text-[#8b2432]">{error}</p> : result ? <div className="prose-output w-full space-y-4 text-sm leading-7 text-ink sm:text-[15px]">{result.split("\n").filter(Boolean).map((line) => <p key={line} className={/^(Clearer version|Why this works):?$/i.test(line.trim()) ? "font-bold text-plum" : ""}>{line}</p>)}</div> : <div className="max-w-xs text-center"><div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-md bg-plum text-white"><Spark className="h-5 w-5" /></div><p className="font-semibold text-ink">Your clearer version will appear here.</p><p className="mt-2 text-sm leading-6 text-[#746a7f]">Direct, respectful, and easier to use under pressure.</p></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

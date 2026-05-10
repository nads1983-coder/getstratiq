import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "../components/Icons";

export const metadata: Metadata = {
  title: "Thank You",
  description:
    "Thank you for supporting STRATIQ, a free AI strategic reasoning platform for clearer judgement under pressure.",
  alternates: {
    canonical: "/thank-you",
  },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="section-shell grid min-h-screen place-items-center py-12">
        <div className="w-full max-w-3xl rounded-lg border border-line bg-white p-6 text-center shadow-soft sm:p-10">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-md border border-gold/70 text-plum">
            <Compass className="h-7 w-7" />
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-plum">Support received</p>
          <h1 className="serif mt-4 text-[2.35rem] font-semibold leading-tight text-ink sm:text-5xl">
            Thank you for supporting STRATIQ.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#665d70] sm:text-lg">
            Your contribution helps keep STRATIQ free while the platform develops better reasoning tools for judgement, risk awareness, communication, and decision clarity.
          </p>
          <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
            {[
              ["Clearer thinking", "Helping people separate signal from noise under pressure."],
              ["Better judgement", "Building tools that assess trade-offs, consequences, and risk."],
              ["Composed action", "Supporting calm, professional decisions when situations are ambiguous."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-lg border border-line bg-[#fbfafc] p-4">
                <h2 className="text-base font-bold text-ink">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#665d70]">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-plum px-7 text-sm font-bold text-white shadow-soft transition hover:bg-[#3d185e]">
              Return Home <ArrowRight />
            </Link>
            <Link href="/#try" className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-gold px-7 text-sm font-bold text-plum transition hover:bg-gold/10">
              Use STRATIQ <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

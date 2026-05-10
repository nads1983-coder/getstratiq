import { ClarityTool } from "./components/ClarityTool";
import { ArrowRight, Compass, Frame, Message, Pattern, Scale, Shield, Target } from "./components/Icons";

const donateUrl = "https://donate.stripe.com/4gM5kD9d4bMr8PealF33W05";

const navItems = [
  ["Reasoning", "#reasoning"],
  ["Use Cases", "#use-cases"],
  ["Try STRATIQ", "#try"],
  ["How It Works", "#how-it-works"],
  ["Support", "#support"],
];

const capabilities = [
  ["Think better", "Separate signal from noise and identify what actually matters."],
  ["Communicate better", "Turn pressure, emotion, and ambiguity into clear professional language."],
  ["Decide better", "Compare routes, trade-offs, consequences, and the strongest next move."],
  ["Assess risk better", "Evaluate operational, communication, relationship, reputation, and escalation risk."],
  ["Read dynamics", "Understand power, incentives, behavioural patterns, and hidden pressure points."],
  ["Act with composure", "Reduce emotional decision-making and choose a cleaner strategic position."],
];

const useCases = [
  ["Difficult conversations", "Prepare the message, anticipate resistance, and avoid escalation."],
  ["Leadership pressure", "Assess what is happening, what matters, and where judgement may be clouded."],
  ["Decision clarity", "Compare options and consequences before committing to a direction."],
  ["Risk and reputation", "Spot operational and communication risks before they become visible problems."],
];

const process = [
  ["Describe the situation", "Give STRATIQ the facts, context, pressure, and outcome you need."],
  ["Analyse the dynamics", "It separates noise from signal and identifies behavioural, communication, and risk patterns."],
  ["Compare the options", "You receive practical routes with trade-offs, risks, and likely consequences."],
  ["Move with clarity", "Leave with a recommendation, wording, and one immediate next step."],
];

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://getstratiq.co/#organization",
        name: "STRATIQ",
        url: "https://getstratiq.co",
        description:
          "STRATIQ is a free AI strategic reasoning platform that helps professionals improve judgement, communication, decision clarity, and risk awareness under pressure.",
      },
      {
        "@type": "WebSite",
        "@id": "https://getstratiq.co/#website",
        name: "STRATIQ",
        url: "https://getstratiq.co",
        publisher: { "@id": "https://getstratiq.co/#organization" },
        inLanguage: "en-GB",
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://getstratiq.co/#software",
        name: "STRATIQ",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://getstratiq.co",
        offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
        description:
          "A free AI reasoning engine for professional judgement, risk assessment, communication analysis, and decision support.",
      },
    ],
  };

  return (
    <main id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="sticky top-0 z-40 border-b border-line/80 bg-white/95 backdrop-blur-xl">
        <div className="section-shell flex min-h-16 items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3" aria-label="STRATIQ home">
            <span className="grid h-10 w-10 place-items-center rounded-md border border-gold/70 bg-white text-plum">
              <Compass className="h-5 w-5" />
            </span>
            <span className="leading-none">
              <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-plum">Get</span>
              <span className="serif block text-2xl font-semibold text-plum">STRATIQ</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#51465d] lg:flex" aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="transition hover:text-plum">
                {label}
              </a>
            ))}
          </nav>
          <a href="#try" className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md bg-plum px-5 text-sm font-bold text-white shadow-soft transition hover:bg-[#3d185e]">
            Try Free
          </a>
        </div>
      </header>

      <section className="section-shell pb-12 pt-7 sm:pb-16 sm:pt-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="py-3">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-plum">AI reasoning for better judgement</p>
            <h1 className="serif mt-5 max-w-4xl text-[2.55rem] font-semibold leading-[1.02] tracking-normal text-ink min-[430px]:text-[3.1rem] sm:text-6xl lg:text-[4.9rem]">
              Think Clearly Under Pressure.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#5c5267] sm:text-xl sm:leading-9">
              STRATIQ is a free AI strategic reasoning engine for professionals who need clearer judgement, sharper communication, better decisions, and stronger risk awareness.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#try" className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-plum px-7 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#3d185e]">
                Use STRATIQ <ArrowRight />
              </a>
              <a href="#reasoning" className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-gold px-7 text-sm font-bold text-plum transition hover:-translate-y-0.5 hover:bg-gold/10">
                See How It Reasons <ArrowRight />
              </a>
            </div>
            <div className="mt-7 grid gap-3 border-t border-line pt-5 sm:grid-cols-3">
              {[
                ["Information is not enough", "STRATIQ interprets what the situation means."],
                ["Judgement improves action", "Compare options before reacting."],
                ["Risk becomes visible", "See consequences before they compound."],
              ].map(([title, text]) => (
                <div key={title}>
                  <p className="text-sm font-bold text-ink">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#706778]">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-line bg-white p-4 shadow-soft sm:p-5">
            <div className="rounded-md border border-line bg-[#fbfafc] p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-plum">Judgement Engine</p>
                  <p className="mt-1 text-sm text-[#706778]">Reasoning output preview</p>
                </div>
                <span className="rounded-full border border-gold/70 px-3 py-1 text-xs font-bold text-plum">Free Access</span>
              </div>
              <div className="mt-4 grid gap-3">
                {[
                  ["Situation summary", "What is happening, what matters most, and what may be noise."],
                  ["Strategic interpretation", "Dynamics, incentives, pressure points, and hidden risks."],
                  ["Options and trade-offs", "Practical routes with pros, cons, and likely consequences."],
                  ["Risk assessment", "Operational, communication, relationship, reputation, and escalation risk."],
                  ["Recommended move", "The clearest action, why it is strongest, and what to avoid."],
                ].map(([title, text], index) => (
                  <div key={title} className="rounded-md border border-line bg-white p-4 shadow-edge">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-plum/10 text-xs font-bold text-plum">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-bold text-ink">{title}</p>
                        <p className="mt-1 text-sm leading-6 text-[#665d70]">{text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reasoning" className="border-y border-line bg-white">
        <div className="section-shell grid gap-8 py-12 lg:grid-cols-[0.82fr_1.18fr] lg:py-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-plum">Reasoning, not information</p>
            <h2 className="serif mt-4 text-[2.05rem] font-semibold leading-tight text-ink sm:text-5xl">
              Most AI gives you more words. STRATIQ improves the quality of the decision.
            </h2>
            <div className="mt-5 h-0.5 w-12 bg-gold" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {capabilities.map(([title, text], index) => (
              <article key={title} className="rounded-lg border border-line bg-white p-5 shadow-edge">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-md border border-plum/20 text-plum">
                  {index === 0 ? <Frame /> : index === 1 ? <Message /> : index === 2 ? <Scale /> : index === 3 ? <Shield /> : index === 4 ? <Pattern /> : <Target />}
                </div>
                <h3 className="text-lg font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#665d70]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="try" className="section-shell py-12 sm:py-16">
        <div className="mb-7 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-plum">Try the reasoning engine</p>
          <h2 className="serif mt-4 text-[2.05rem] font-semibold leading-tight text-ink sm:text-5xl">
            Bring STRATIQ a situation where judgement matters.
          </h2>
          <p className="mt-4 text-base leading-8 text-[#665d70] sm:text-lg">
            Describe a decision, conversation, conflict, risk, or professional pressure point. STRATIQ will return structured reasoning, not generic advice.
          </p>
        </div>
        <ClarityTool />
      </section>

      <section id="use-cases" className="border-y border-line bg-[#fbfafc]">
        <div className="section-shell py-12 sm:py-16">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-plum">Professional clarity platform</p>
            <h2 className="serif mt-4 text-[2.05rem] font-semibold leading-tight text-ink sm:text-5xl">
              Built for pressure, ambiguity, communication risk, and consequence.
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {useCases.map(([title, text], index) => (
              <article key={title} className="rounded-lg border border-line bg-white p-5 shadow-edge">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-md bg-plum/10 text-plum">
                  {index === 0 ? <Message /> : index === 1 ? <Target /> : index === 2 ? <Scale /> : <Shield />}
                </div>
                <h3 className="text-lg font-bold text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#665d70]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-shell py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-plum">How it works</p>
            <h2 className="serif mt-4 text-[2.05rem] font-semibold leading-tight text-ink sm:text-5xl">
              A simple process for clearer judgement.
            </h2>
          </div>
          <div className="grid gap-3">
            {process.map(([title, text], index) => (
              <article key={title} className="rounded-lg border border-line bg-white p-5 shadow-edge">
                <div className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-plum text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#665d70]">{text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="support" className="section-shell pb-14 sm:pb-20">
        <div className="grid gap-6 rounded-lg border border-line bg-white p-6 shadow-soft sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-plum">Help keep STRATIQ free</p>
            <h2 className="serif mt-3 text-[2rem] font-semibold leading-tight text-ink sm:text-4xl">
              Optional support for a free reasoning platform.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#665d70] sm:text-base">
              STRATIQ is free to use. Contributions help improve the reasoning system, build future tools, and keep professional judgement support accessible.
            </p>
          </div>
          <a href={donateUrl} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-gold bg-gold/10 px-7 text-sm font-bold text-plum transition hover:-translate-y-0.5 hover:bg-gold/20">
            Support STRATIQ <ArrowRight />
          </a>
        </div>
      </section>

      <footer className="border-t border-line bg-white">
        <div className="section-shell grid gap-7 py-9 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md border border-gold/70 text-plum">
                <Compass className="h-5 w-5" />
              </span>
              <span className="serif text-3xl font-semibold text-plum">STRATIQ</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#665d70]">
              Free AI strategic reasoning for judgement, communication, decision clarity, and risk awareness under pressure.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-plum">Platform</h3>
            <div className="mt-4 grid gap-2 text-sm text-[#5f5669]">
              {navItems.slice(0, 4).map(([label, href]) => (
                <a key={label} href={href} className="hover:text-plum">{label}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-plum">Access</h3>
            <div className="mt-4 grid gap-2 text-sm text-[#5f5669]">
              <a href="#try" className="hover:text-plum">Use STRATIQ Free</a>
              <a href={donateUrl} target="_blank" rel="noreferrer" className="hover:text-plum">Support STRATIQ</a>
            </div>
          </div>
        </div>
        <div className="section-shell border-t border-line py-5 text-xs text-[#746a7f]">
          &copy; {new Date().getFullYear()} STRATIQ. Free AI reasoning for better judgement.
        </div>
      </footer>
    </main>
  );
}

"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

const CONTACT_EMAIL = "contato@10xai.us";
const DEFAULT_BOOKING_URL = "#contact";

const navItems = [
  ["Differentiation", "#difference"],
  ["Use cases", "#use-cases"],
  ["ROI", "#roi"],
  ["Offers", "#offers"],
  ["FAQ", "#faq"],
] as const;

const differenceItems = [
  {
    title: "Implementation, not inspiration",
    text: "10XAI should win as the team that ships the workflow, connects the stack, documents the SOP, and trains the humans.",
  },
  {
    title: "Built for SMB economics",
    text: "The site now speaks to speed, budget, and payback instead of enterprise theater and vague transformation language.",
  },
  {
    title: "Adoption is part of delivery",
    text: "Most agencies stop after setup. 10XAI should own rollout, prompts, enablement, and weekly optimization.",
  },
];

const useCases = [
  {
    name: "Clinics and healthcare ops",
    bullets: [
      "Appointment intake, confirmations, reschedules, and no-show recovery",
      "Patient FAQ and document triage copilots",
      "Post-visit follow-up and review capture",
    ],
  },
  {
    name: "Legal and professional services",
    bullets: [
      "Contract intake, clause extraction, and client update drafting",
      "Proposal assembly, meeting summaries, and knowledge assistants",
      "Matter-status automation for clients and internal teams",
    ],
  },
  {
    name: "Distribution, ecommerce, and field operations",
    bullets: [
      "Quote-to-order automation and sales follow-up sequences",
      "Demand summaries, issue routing, and warehouse exception handling",
      "Service ticket classification and dispatch support",
    ],
  },
  {
    name: "Owner-led service businesses",
    bullets: [
      "Inbound lead qualification and reactivation",
      "Proposal drafting and follow-up reminders",
      "Inbox, calendar, and task automation for busy founders",
    ],
  },
];

const offers = [
  {
    title: "AI Opportunity Sprint",
    timeline: "2 weeks",
    bullets: [
      "Process audit and workflow mapping",
      "Prioritized backlog with ROI logic",
      "One high-conviction automation blueprint",
    ],
  },
  {
    title: "Automation Buildout",
    timeline: "30-45 days",
    bullets: [
      "Workflow implementation and tool integration",
      "Prompting, guardrails, and testing",
      "Launch support and KPI dashboard",
    ],
  },
  {
    title: "AI Operating System",
    timeline: "90 days",
    bullets: [
      "Multiple systems across revenue, ops, and service",
      "Team training and weekly optimization",
      "Leadership reporting and scaling roadmap",
    ],
  },
];

const comparisonRows = [
  ["Big consultancies", "Strong at strategy, too slow and too expensive for SMB urgency."],
  ["Automation platforms", "Great tools, but buyers still need design, rollout, and ownership."],
  ["Freelancers", "Fast to start, weak on adoption, architecture, and repeatability."],
  ["10XAI", "Operator-minded implementation partner that ships, trains, and optimizes."],
] as const;

const faqItems = [
  [
    "How fast can this go live?",
    "A focused sprint can start producing value in 2 to 4 weeks. Larger multi-workflow rollouts usually land in 30 to 90 days.",
  ],
  [
    "Do we need a data team first?",
    "Not always. For many SMBs, the best first wins come from workflow automation, internal copilots, and process cleanup before advanced data work.",
  ],
  [
    "Will this replace our team?",
    "The strongest SMB use cases remove bottlenecks, not ownership. The goal is better throughput, faster response, and fewer manual loops.",
  ],
  [
    "What stack should we expect?",
    "Usually a mix of business tools you already use plus Vercel, Supabase, AI APIs, calendar and email integrations, and lightweight dashboards.",
  ],
] as const;

function SectionIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-3xl">
      <span className="eyebrow">
        <span className="brand-dot" />
        {eyebrow}
      </span>
      <h2 className="display-title mt-6 text-3xl font-semibold tracking-tight text-[var(--paper)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {body ? <p className="section-copy mt-5 text-lg leading-8">{body}</p> : null}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[var(--line)] bg-white/4 px-3 py-2 text-sm text-[var(--muted)]">
      {children}
    </span>
  );
}

export default function Home() {
  const [people, setPeople] = useState(6);
  const [hoursPerWeek, setHoursPerWeek] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [automationShare, setAutomationShare] = useState(40);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [challenge, setChallenge] = useState("");

  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || DEFAULT_BOOKING_URL;
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || `mailto:${CONTACT_EMAIL}`;
  const monthlyRecovered = Math.round(
    people * hoursPerWeek * 4.33 * hourlyRate * (automationShare / 100)
  );
  const quarterlyImpact = monthlyRecovered * 3;
  const sprintCost = 7500;
  const paybackMonths = monthlyRecovered > 0 ? sprintCost / monthlyRecovered : 0;
  const recommendedOffer =
    monthlyRecovered < 4000
      ? offers[0].title
      : monthlyRecovered < 12000
        ? offers[1].title
        : offers[2].title;

  function handleBriefSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = `10XAI brief from ${company || name || "website visitor"}`;
    const body = [
      "Name",
      name,
      "",
      "Company",
      company,
      "",
      "Work email",
      email,
      "",
      "Main challenge",
      challenge,
      "",
      "Estimated monthly labor value recovered",
      `$${monthlyRecovered.toLocaleString("en-US")}`,
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main className="noise-overlay min-h-screen overflow-x-hidden">
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(7,14,28,0.72)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <a href="#top" className="flex items-center gap-3">
            <Image
              src="/brand/10xai-logo.png"
              alt="10XAI"
              width={118}
              height={28}
              className="h-7 w-auto"
              priority
            />
            <span className="hidden font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted)] sm:inline">
              AI implementation
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="text-sm text-[var(--muted)] hover:text-[var(--paper)]">
                {label}
              </a>
            ))}
          </nav>

          <a
            href={bookingUrl}
            className="hidden rounded-full border border-[var(--brand)] bg-[var(--brand)] px-4 py-2 text-sm font-medium text-[var(--background)] shadow-[0_0_24px_var(--brand-glow)] hover:-translate-y-0.5 sm:inline-flex"
          >
            Book an AI growth call
          </a>
        </div>
      </header>

      <section
        id="top"
        className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28 lg:pt-20"
      >
        <div className="relative z-10">
          <span className="eyebrow">
            <span className="brand-dot" />
            AI implementation and automation for ambitious SMBs
          </span>
          <h1 className="display-title mt-8 max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-[var(--paper)] sm:text-6xl lg:text-7xl">
            Operational AI that makes small teams move like market leaders.
          </h1>
          <p className="section-copy mt-7 max-w-2xl text-lg leading-8 sm:text-xl">
            10XAI helps growing companies automate revenue, service, and back-office work
            without enterprise drag. We design, build, launch, and train your team so the
            system actually gets used.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Pill>Built for small and mid-sized businesses</Pill>
            <Pill>From audit to deployed workflows</Pill>
            <Pill>Adoption and team enablement included</Pill>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={bookingUrl}
              className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3.5 text-base font-medium text-[var(--background)] hover:-translate-y-0.5"
            >
              Book an AI growth call
            </a>
            <a
              href="#roi"
              className="inline-flex items-center justify-center rounded-full border border-[var(--line-strong)] px-6 py-3.5 text-base font-medium text-[var(--paper)] hover:border-[var(--brand)] hover:text-[var(--paper)]"
            >
              Jump to ROI estimator
            </a>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {[
              ["2-4", "weeks for a sharp first win"],
              ["ROI", "tracked around margin, time, and response speed"],
              ["SMB", "scope designed for fast-moving operators"],
            ].map(([value, label]) => (
              <div key={label} className="panel rounded-3xl p-5">
                <div className="metric-value brand-gradient">{value}</div>
                <p className="metric-label mt-3">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual panel-strong ambient-ring relative rounded-[2rem] p-4 sm:p-6 lg:p-7">
          <div className="logo-stage relative rounded-[1.6rem] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--paper)]/72">
                10XAI operating layer
              </p>
              <span className="rounded-full border border-[var(--line)] bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                Midnight cyan system
              </span>
            </div>

            <div className="relative z-10 mt-10 flex justify-center">
              <Image
                src="/brand/10xai-logo.png"
                alt="10XAI logo"
                width={412}
                height={171}
                className="h-auto w-full max-w-[320px] drop-shadow-[0_0_42px_rgba(23,208,239,0.16)] sm:max-w-[360px]"
                priority
              />
            </div>

            <div className="relative z-10 mt-10 space-y-3">
              {[
                "Revenue systems that qualify, follow up, and book without manual lag",
                "Ops copilots that reduce repetitive work across inbox, docs, and coordination",
                "Rollout support so the team actually uses the workflow every day",
              ].map((item, index) => (
                <div
                  key={item}
                  className="signal-card rounded-2xl px-4 py-3 text-sm text-[var(--paper)]/88"
                >
                  <span className="mr-3 font-mono text-[var(--brand)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="difference" className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24">
        <SectionIntro
          eyebrow="Why 10XAI can win"
          title="Most AI agencies sell noise. The best positioning is execution with operator empathy."
          body="The market is crowded with strategy decks, generic no-code automation, or product subscriptions pretending to be implementation. 10XAI should sit in the lane between consultancy and software: fast, custom, measurable rollout for owners and operators."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {differenceItems.map((item) => (
            <article key={item.title} className="panel rounded-[1.75rem] p-7">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--brand)]">
                Advantage
              </p>
              <h3 className="mt-4 text-2xl font-medium text-[var(--paper)]">{item.title}</h3>
              <p className="section-copy mt-4 leading-7">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="use-cases" className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24">
        <SectionIntro
          eyebrow="Where margin hides"
          title="The strongest wedge is verticalized operational playbooks."
          body="Instead of sounding like every generalist AI shop, lead with concrete business systems that SMB owners can immediately picture in their companies."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {useCases.map((item) => (
            <article key={item.name} className="panel rounded-[1.75rem] p-7">
              <h3 className="text-2xl font-medium text-[var(--paper)]">{item.name}</h3>
              <ul className="mt-5 space-y-3">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-[var(--muted)]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--brand)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="roi" className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionIntro
            eyebrow="Interactive proof"
            title="A live ROI estimator converts better than vague promises."
            body="Use the calculator to anchor the conversation around recovered hours, margin, and payback speed. It turns AI from hype into economics."
          />
          <div className="panel-strong rounded-[2rem] p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-[var(--muted)]">People doing the work</span>
                <input
                  type="range"
                  min={1}
                  max={40}
                  value={people}
                  onChange={(event) => setPeople(Number(event.target.value))}
                  className="w-full accent-[var(--brand)]"
                />
                <span className="mt-2 block text-lg text-[var(--paper)]">{people}</span>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-[var(--muted)]">
                  Repetitive hours per person per week
                </span>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={hoursPerWeek}
                  onChange={(event) => setHoursPerWeek(Number(event.target.value))}
                  className="w-full accent-[var(--brand)]"
                />
                <span className="mt-2 block text-lg text-[var(--paper)]">{hoursPerWeek}</span>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-[var(--muted)]">Blended hourly cost</span>
                <input
                  type="range"
                  min={15}
                  max={150}
                  value={hourlyRate}
                  onChange={(event) => setHourlyRate(Number(event.target.value))}
                  className="w-full accent-[var(--brand)]"
                />
                <span className="mt-2 block text-lg text-[var(--paper)]">${hourlyRate}</span>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-[var(--muted)]">Automatable share</span>
                <input
                  type="range"
                  min={10}
                  max={90}
                  value={automationShare}
                  onChange={(event) => setAutomationShare(Number(event.target.value))}
                  className="w-full accent-[var(--brand)]"
                />
                <span className="mt-2 block text-lg text-[var(--paper)]">{automationShare}%</span>
              </label>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-[var(--line)] bg-[rgba(6,12,22,0.35)] p-5">
                <p className="text-sm text-[var(--muted)]">Monthly labor value recovered</p>
                <p className="mt-4 text-3xl font-semibold text-[var(--paper)]">
                  ${monthlyRecovered.toLocaleString("en-US")}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[var(--line)] bg-[rgba(6,12,22,0.35)] p-5">
                <p className="text-sm text-[var(--muted)]">90-day impact</p>
                <p className="mt-4 text-3xl font-semibold text-[var(--paper)]">
                  ${quarterlyImpact.toLocaleString("en-US")}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[var(--line)] bg-[rgba(6,12,22,0.35)] p-5">
                <p className="text-sm text-[var(--muted)]">Estimated payback on a sprint</p>
                <p className="mt-4 text-3xl font-semibold text-[var(--paper)]">
                  {paybackMonths > 0 ? `${paybackMonths.toFixed(1)} mo` : "--"}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-[var(--brand)] bg-[var(--brand-soft)] p-5">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                Best first engagement
              </p>
              <p className="mt-3 text-2xl font-medium text-[var(--paper)]">{recommendedOffer}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="offers" className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24">
        <SectionIntro
          eyebrow="Commercial architecture"
          title="Fixed-scope offers outperform vague consulting menus."
          body="Make buying easy. Buyers should know what happens first, how fast it moves, and what success looks like."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {offers.map((item) => (
            <article key={item.title} className="panel rounded-[1.75rem] p-7">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-2xl font-medium text-[var(--paper)]">{item.title}</h3>
                <span className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  {item.timeline}
                </span>
              </div>
              <ul className="mt-6 space-y-3">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-[var(--muted)]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--brand)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24">
        <SectionIntro
          eyebrow="Positioning contrast"
          title="How 10XAI should sound against the market"
        />
        <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-[var(--line)]">
          {comparisonRows.map(([label, detail], index) => (
            <div
              key={label}
              className={`grid gap-4 px-6 py-5 sm:grid-cols-[0.35fr_0.65fr] ${index < comparisonRows.length - 1 ? "border-b border-[var(--line)]" : ""} ${label === "10XAI" ? "bg-[var(--brand-soft)]" : "bg-[rgba(7,14,28,0.34)]"}`}
            >
              <p className="font-medium text-[var(--paper)]">{label}</p>
              <p className="text-[var(--muted)]">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24">
        <SectionIntro eyebrow="FAQ" title="The objections worth answering early" />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {faqItems.map(([question, answer]) => (
            <article key={question} className="panel rounded-[1.75rem] p-7">
              <h3 className="text-xl font-medium text-[var(--paper)]">{question}</h3>
              <p className="section-copy mt-4 leading-7">{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionIntro
            eyebrow="Next step"
            title="Make the conversion path feel immediate."
            body="For a lead-focused site, the primary CTA should drive to a booked conversation. The fallback should capture a detailed brief by email so no intent is lost."
          />
          <div className="grid gap-5">
            <div className="panel-strong rounded-[2rem] p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-3">
                <a
                  href={bookingUrl}
                  className="rounded-[1.5rem] border border-[var(--brand)] bg-[var(--brand)] px-4 py-5 text-center font-medium text-[var(--background)] hover:-translate-y-0.5"
                >
                  Open booking flow
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="rounded-[1.5rem] border border-[var(--line-strong)] px-4 py-5 text-center font-medium text-[var(--paper)] hover:border-[var(--brand)]"
                >
                  Email the brief
                </a>
                <a
                  href={whatsappUrl}
                  className="rounded-[1.5rem] border border-[var(--line-strong)] px-4 py-5 text-center font-medium text-[var(--paper)] hover:border-[var(--brand)]"
                >
                  Write on WhatsApp
                </a>
              </div>
              <p className="section-copy mt-5 text-sm">
                Tip: connect NEXT_PUBLIC_BOOKING_URL to your Google Calendar appointment
                schedule or Cal.com link for a true booking flow.
              </p>
            </div>

            <form onSubmit={handleBriefSubmit} className="panel rounded-[2rem] p-6 sm:p-8">
              <h3 className="text-2xl font-medium text-[var(--paper)]">Send a qualified brief</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-[var(--muted)]">Name</span>
                  <input
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-2xl border border-[var(--line)] bg-[rgba(7,14,28,0.44)] px-4 py-3 text-[var(--paper)] outline-none focus:border-[var(--brand)]"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-[var(--muted)]">Company</span>
                  <input
                    required
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    className="w-full rounded-2xl border border-[var(--line)] bg-[rgba(7,14,28,0.44)] px-4 py-3 text-[var(--paper)] outline-none focus:border-[var(--brand)]"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm text-[var(--muted)]">Work email</span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-2xl border border-[var(--line)] bg-[rgba(7,14,28,0.44)] px-4 py-3 text-[var(--paper)] outline-none focus:border-[var(--brand)]"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm text-[var(--muted)]">
                    What process is costing you time or money right now?
                  </span>
                  <textarea
                    required
                    rows={5}
                    value={challenge}
                    onChange={(event) => setChallenge(event.target.value)}
                    className="w-full rounded-2xl border border-[var(--line)] bg-[rgba(7,14,28,0.44)] px-4 py-3 text-[var(--paper)] outline-none focus:border-[var(--brand)]"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex rounded-full bg-[var(--paper)] px-6 py-3 font-medium text-[var(--background)] hover:-translate-y-0.5"
              >
                Prepare email draft
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] px-5 py-8 text-sm text-[var(--muted)] sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Built to replace a generic Lovable site with a differentiated
            conversion-focused system for 10XAI.
          </p>
          <p>
            {CONTACT_EMAIL} · Sao Paulo + Miami
          </p>
        </div>
      </footer>

      <div className="sticky-cta fixed inset-x-0 bottom-0 z-50 p-3 lg:hidden">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3">
          <a
            href={bookingUrl}
            className="rounded-full bg-[var(--brand)] px-4 py-3 text-center text-sm font-medium text-[var(--background)]"
          >
            Book call
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="rounded-full border border-[var(--line-strong)] px-4 py-3 text-center text-sm font-medium text-[var(--paper)]"
          >
            Email
          </a>
        </div>
      </div>
    </main>
  );
}

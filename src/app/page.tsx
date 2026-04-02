"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

const CONTACT_EMAIL = "contato@10xai.us";
const DEFAULT_BOOKING_URL = "#contact";

const navItems = [
  ["Vision", "#difference"],
  ["Use cases", "#use-cases"],
  ["ROI", "#roi"],
  ["Method", "#offers"],
  ["Book", "#contact"],
] as const;

const firstThirtySecondsSentence =
  "Within the first 30 seconds, a new buyer should see the exact business system to automate first and feel compelled to book the working session that gets it live.";

const differenceItems = [
  {
    title: "Business systems, not AI theater",
    text: "10XAI should position itself as the team that turns postponed strategic ideas into working operating systems for revenue, onboarding, service, and delivery.",
  },
  {
    title: "Built for SMB speed and economics",
    text: "The strongest message is practical urgency: fast implementation, measurable payback, and systems leaders can actually roll out without enterprise drag.",
  },
  {
    title: "Adoption is part of the product",
    text: "The market has plenty of tools. The gap is making teams use them confidently every day through rollout, enablement, and operational discipline.",
  },
];

const useCases = [
  {
    name: "LMS onboarding and training system",
    audience: "HR, enablement, operations",
    story:
      "The company has wanted a real onboarding academy for years. 10XAI turns scattered SOPs, decks, videos, and tribal knowledge into a structured LMS experience with AI support, recommended lessons, and role-based training.",
    outcome:
      "New hires ramp faster, managers repeat themselves less, and the business finally has a living training engine instead of folders nobody opens.",
    bullets: [
      "Build learning journeys and role-based onboarding paths",
      "Transform existing docs and videos into guided modules",
      "Use AI to summarize, quiz, recommend, and reinforce learning",
    ],
  },
  {
    name: "AI sales playbook plus operating CRM",
    audience: "Sales leaders, founders, commercial teams",
    story:
      "Instead of another CRM full of notes, 10XAI can design a modern commercial system where reps know what to do next, see AI-generated account insights, prepare for meetings faster, and send better follow-up with less friction.",
    outcome:
      "The sales team works with more confidence, managers coach from signal instead of guesswork, and the pipeline gets cleaner, faster, and more consistent.",
    bullets: [
      "Operational playbook aligned to your sales motion and stages",
      "AI recommendations for next meeting, deal movement, and engagement",
      "Export-ready email drafts for Gmail or Outlook",
    ],
  },
  {
    name: "Marketing automation with autonomous agents",
    audience: "Marketing teams, growth leaders, founders",
    story:
      "10XAI can build a marketing engine that maps content, creates calendars, writes copy, generates media, plans cadences, triggers journeys, and publishes automatically across the channels that matter.",
    outcome:
      "The brand becomes more visible, the cadence becomes consistent, and the company starts looking bigger, sharper, and more disciplined in the market.",
    bullets: [
      "Content maps, campaign calendars, and journey logic",
      "AI-generated posts, images, videos, and campaign assets",
      "Scheduling, approvals, and automatic publishing workflows",
    ],
  },
  {
    name: "RFP intelligence and bid qualification agent",
    audience: "B2B teams, public tenders, enterprise sellers",
    story:
      "Public tenders and RFPs consume time because teams are constantly comparing documents, interpreting fit, and rewriting narrative. 10XAI can create an agent that scores fit, identifies gaps, and recommends how to improve your product description before you chase the bid.",
    outcome:
      "Your team pursues better opportunities, improves win-readiness, and gets a sharper commercial narrative over time.",
    bullets: [
      "Compare requirements against your product capabilities",
      "Score alignment and highlight missing proof or positioning gaps",
      "Recommend how to proceed and improve the bid narrative",
    ],
  },
  {
    name: "Automated booking and customer service for dentists",
    audience: "Dental clinics, front-desk teams, healthcare operators",
    story:
      "Dental practices lose revenue between inbound interest, appointment booking, reminders, reschedules, cancellations, and patient questions. 10XAI can design a booking and service layer that keeps patients moving and the front desk calmer.",
    outcome:
      "More appointments booked, fewer empty chairs, faster responses, and a better patient experience without front-desk overload.",
    bullets: [
      "Booking, reminders, reschedules, and no-show recovery",
      "FAQ support and patient-service workflows",
      "Clear handoff for urgent requests and follow-up communication",
    ],
  },
];

const offers = [
  {
    title: "Future-state vision",
    timeline: "Week 1",
    bullets: [
      "Define what the business should feel like six months from now",
      "Choose the first system that changes perception fast",
      "Frame success around speed, clarity, and operating leverage",
    ],
  },
  {
    title: "System design and launch",
    timeline: "Weeks 2-6",
    bullets: [
      "Design workflows, prompts, integrations, and guardrails",
      "Implement the stack and test the behavior",
      "Launch the first live operating system with KPI visibility",
    ],
  },
  {
    title: "Adoption and compounding",
    timeline: "90 days",
    bullets: [
      "Train the team and reinforce daily usage",
      "Optimize the system based on real operating signal",
      "Use the first win to accelerate the next three initiatives",
    ],
  },
];

const comparisonRows = [
  ["Large consultancies", "Strong on decks and steering committees, too heavy for SMB speed and economics."],
  ["Automation platforms", "Powerful products, but the buyer still has to design the workflow, rollout, and adoption plan."],
  ["Freelancers", "Quick to start, but often fragile on architecture, change management, and repeatability."],
  ["10XAI", "Business-oriented implementation partner that designs the system, launches it, and helps the team use it."],
] as const;

const faqItems = [
  [
    "How fast can this go live?",
    "The first system can usually start producing visible value in 2 to 4 weeks. Broader rollouts across multiple workflows often land in 30 to 90 days.",
  ],
  [
    "Is this only for larger companies?",
    "No. The strongest fit is often a small or mid-sized company that already feels process pain and wants implementation, not another strategy deck.",
  ],
  [
    "Do we need to replace our current tools?",
    "Usually not. The fastest wins often come from connecting the tools you already use and making them more intelligent, more automated, and easier to operate.",
  ],
  [
    "Why should we book now instead of later?",
    "Because the companies that operationalize first gain faster internal learning, faster customer response, and faster commercial momentum. Delay is not neutral.",
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
  const useCaseRecommendation =
    monthlyRecovered < 4000
      ? useCases[0].name
      : monthlyRecovered < 12000
        ? useCases[1].name
        : useCases[2].name;

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
      "",
      "Recommended first system",
      useCaseRecommendation,
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
              AI operating systems
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
            Schedule the working session
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
            AI operating systems for ambitious small and mid-sized businesses
          </span>
          <h1 className="display-title mt-8 max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-[var(--paper)] sm:text-6xl lg:text-7xl">
            Build the system your team has been talking about for years.
          </h1>
          <p className="section-copy mt-7 max-w-2xl text-lg leading-8 sm:text-xl">
            10XAI designs and launches business-oriented AI systems for onboarding,
            sales, marketing, service, booking, and bid qualification so teams move faster,
            look sharper, and stop losing margin to repetitive work.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Pill>LMS onboarding implementation</Pill>
            <Pill>AI sales playbook plus CRM intelligence</Pill>
            <Pill>Marketing automation agents</Pill>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={bookingUrl}
              className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3.5 text-base font-medium text-[var(--background)] hover:-translate-y-0.5"
            >
              Book the strategy session
            </a>
            <a
              href="#use-cases"
              className="inline-flex items-center justify-center rounded-full border border-[var(--line-strong)] px-6 py-3.5 text-base font-medium text-[var(--paper)] hover:border-[var(--brand)] hover:text-[var(--paper)]"
            >
              Explore the business systems
            </a>
          </div>

          <div className="mt-14 max-w-3xl border-l border-[var(--brand)] pl-5">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
              The first 30-second promise
            </p>
            <p className="mt-4 text-2xl leading-9 text-[var(--paper)] sm:text-3xl">
              {firstThirtySecondsSentence}
            </p>
          </div>
        </div>

        <div className="hero-visual panel-strong ambient-ring relative rounded-[2rem] p-4 sm:p-6 lg:p-7">
          <div className="logo-stage relative rounded-[1.6rem] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--paper)]/72">
                Corporate vision made operational
              </p>
              <span className="rounded-full border border-[var(--line)] bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                Nike x Apple energy
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
                "The LMS onboarding engine your team has wanted for years, finally live",
                "A sales operating system that tells reps what to do next and writes the follow-up",
                "Marketing, service, and booking workflows that feel faster immediately",
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
          eyebrow="Why buyers move now"
          title="The companies that operationalize AI first do not just save time. They change how the market experiences them."
          body="Faster follow-up feels like better service. Smarter preparation feels like stronger leadership. Consistent campaigns feel like a bigger company. That perception gap becomes pipeline, trust, and momentum."
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
          eyebrow="Use-case storytelling"
          title="Show buyers the business system they have been postponing, and the appointment becomes easier to book."
          body="Instead of listing services, show the future-state operating picture. The buyer should immediately recognize their own bottleneck and the system that would remove it."
        />
        <div className="mt-10 space-y-5">
          {useCases.map((item) => (
            <article key={item.name} className="panel rounded-[2rem] p-7 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--brand)]">
                    {item.audience}
                  </p>
                  <h3 className="mt-3 text-2xl font-medium text-[var(--paper)] sm:text-3xl">
                    {item.name}
                  </h3>
                </div>
              </div>
              <p className="section-copy mt-5 max-w-4xl text-lg leading-8">{item.story}</p>
              <p className="mt-5 max-w-4xl text-lg leading-8 text-[var(--paper)]/90">{item.outcome}</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {item.bullets.map((bullet) => (
                  <div key={bullet} className="rounded-[1.5rem] border border-[var(--line)] bg-white/3 p-4">
                    <p className="text-sm leading-6 text-[var(--muted)]">{bullet}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="roi" className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionIntro
            eyebrow="Commercial proof"
            title="Turn urgency into economics and economics into a booked call."
            body="The strongest conversion mechanism here is not abstract innovation language. It is the feeling that the buyer can quantify the drag they are living with right now."
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
                <p className="text-sm text-[var(--muted)]">Monthly value recovered</p>
                <p className="mt-4 text-3xl font-semibold text-[var(--paper)]">
                  ${monthlyRecovered.toLocaleString("en-US")}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[var(--line)] bg-[rgba(6,12,22,0.35)] p-5">
                <p className="text-sm text-[var(--muted)]">90-day business impact</p>
                <p className="mt-4 text-3xl font-semibold text-[var(--paper)]">
                  ${quarterlyImpact.toLocaleString("en-US")}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[var(--line)] bg-[rgba(6,12,22,0.35)] p-5">
                <p className="text-sm text-[var(--muted)]">Estimated payback</p>
                <p className="mt-4 text-3xl font-semibold text-[var(--paper)]">
                  {paybackMonths > 0 ? `${(paybackMonths * 4.33).toFixed(1)} wks` : "--"}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-[var(--brand)] bg-[var(--brand-soft)] p-5">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                Recommended first system
              </p>
              <p className="mt-3 text-2xl font-medium text-[var(--paper)]">{useCaseRecommendation}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="offers" className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24">
        <SectionIntro
          eyebrow="Corporate vision methodology"
          title="Your team is the hero. 10XAI is the partner that turns the vision into a repeatable operating reality."
          body="This is not about dropping tools on top of an old process. It is about building the next version of how the company runs, with a sequence leadership can understand and teams can adopt."
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
          title="The market has tools, strategists, and freelancers. What most SMBs still need is a partner that makes the system real."
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
            title="The right CTA is not 'learn more.' It is the working session that shows what your first system should be."
            body="The people who book fastest are usually the ones who already feel the pain: slow onboarding, weak follow-up, inconsistent marketing, missed bids, and manual booking chaos. Use that urgency while the problem is visible."
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
                Connect NEXT_PUBLIC_BOOKING_URL to your live booking flow in Vercel so the
                main CTA goes directly to the appointment experience.
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
                    Which business system should your company stop postponing?
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
          <p>10XAI builds business-oriented AI operating systems for fast-moving SMBs.</p>
          <p>{CONTACT_EMAIL} | Sao Paulo + Miami</p>
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

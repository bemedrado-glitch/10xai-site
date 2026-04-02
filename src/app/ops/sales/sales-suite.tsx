"use client";

import { useMemo, useState } from "react";

const outreachSteps = [
  "Agent 1: build account list and tier by ICP fit",
  "Agent 2: detect live trigger events and pain signals",
  "Agent 3: draft tailored outbound messages by segment",
  "Agent 4: queue follow-up tasks and log activity into CRM",
];

export default function SalesSuite() {
  const [icp, setIcp] = useState("Dental groups with 3 to 25 locations");
  const [signal, setSignal] = useState("Slow lead follow-up and front-desk overload");
  const [offer, setOffer] = useState("Booking and customer service automation");
  const [weeklyAccounts, setWeeklyAccounts] = useState(40);
  const [replyRate, setReplyRate] = useState(7);

  const meetings = useMemo(
    () => Math.round(weeklyAccounts * (replyRate / 100) * 0.55),
    [replyRate, weeklyAccounts],
  );

  const sequence = [
    `Day 1: personalized cold email anchored in ${signal.toLowerCase()}.`,
    `Day 3: short follow-up with a sharper operational angle tied to ${offer.toLowerCase()}.`,
    "Day 6: LinkedIn or WhatsApp nudge for the identified owner.",
    "Day 9: final value-forward touch with one quantified business case.",
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="ops-card">
        <span className="eyebrow">
          <span className="brand-dot" />
          Sales prospecting suite
        </span>
        <h2 className="mt-6 text-3xl font-medium text-[var(--paper)]">
          Build a tighter outbound machine around real operating pain.
        </h2>
        <div className="mt-8 grid gap-4">
          <label className="block">
            <span className="mb-2 block text-sm text-[var(--muted)]">ICP</span>
            <input
              value={icp}
              onChange={(event) => setIcp(event.target.value)}
              className="ops-input"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-[var(--muted)]">
              Trigger pain
            </span>
            <input
              value={signal}
              onChange={(event) => setSignal(event.target.value)}
              className="ops-input"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-[var(--muted)]">
              Primary offer
            </span>
            <input
              value={offer}
              onChange={(event) => setOffer(event.target.value)}
              className="ops-input"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm text-[var(--muted)]">
                Target accounts / week
              </span>
              <input
                type="range"
                min={10}
                max={150}
                value={weeklyAccounts}
                onChange={(event) => setWeeklyAccounts(Number(event.target.value))}
                className="w-full accent-[var(--brand)]"
              />
              <span className="mt-2 block text-lg text-[var(--paper)]">
                {weeklyAccounts}
              </span>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-[var(--muted)]">
                Expected reply rate
              </span>
              <input
                type="range"
                min={1}
                max={20}
                value={replyRate}
                onChange={(event) => setReplyRate(Number(event.target.value))}
                className="w-full accent-[var(--brand)]"
              />
              <span className="mt-2 block text-lg text-[var(--paper)]">
                {replyRate}%
              </span>
            </label>
          </div>
        </div>
      </section>

      <section className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-3">
          <article className="ops-metric">
            <p className="text-sm text-[var(--muted)]">Weekly accounts</p>
            <p className="mt-3 text-3xl font-semibold text-[var(--paper)]">
              {weeklyAccounts}
            </p>
          </article>
          <article className="ops-metric">
            <p className="text-sm text-[var(--muted)]">Projected meetings</p>
            <p className="mt-3 text-3xl font-semibold text-[var(--paper)]">
              {meetings}
            </p>
          </article>
          <article className="ops-metric">
            <p className="text-sm text-[var(--muted)]">Primary motion</p>
            <p className="mt-3 text-lg font-semibold text-[var(--paper)]">
              Pain-led outbound
            </p>
          </article>
        </div>

        <article className="ops-card">
          <h3 className="text-2xl font-medium text-[var(--paper)]">
            Suggested agent chain
          </h3>
          <div className="mt-5 grid gap-3">
            {outreachSteps.map((step) => (
              <div key={step} className="ops-row">
                <span className="ops-dot" />
                <p className="text-sm leading-7 text-[var(--muted)]">{step}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="ops-card">
          <h3 className="text-2xl font-medium text-[var(--paper)]">
            Sequence preview
          </h3>
          <p className="section-copy mt-3 text-sm leading-7">
            Ideal prospect: {icp}.
          </p>
          <div className="mt-5 grid gap-3">
            {sequence.map((step) => (
              <div key={step} className="ops-row">
                <span className="ops-dot" />
                <p className="text-sm leading-7 text-[var(--muted)]">{step}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

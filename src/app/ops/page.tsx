import Link from "next/link";

const suites = [
  {
    title: "Sales prospecting suite",
    href: "/ops/sales",
    eyebrow: "Outbound automation",
    summary:
      "Account prioritization, trigger-based outreach logic, sequence design, and CRM hygiene guidance for a lean revenue team.",
    bullets: [
      "ICP and account-tier framing",
      "Prospecting agent roster",
      "Sequence logic by buying signal",
    ],
  },
  {
    title: "Marketing suite",
    href: "/ops/marketing",
    eyebrow: "Campaign operations",
    summary:
      "A campaign sprint builder for positioning, channel mix, asset production rhythm, and approvals across owned and outbound channels.",
    bullets: [
      "Campaign sprint planning",
      "Content and asset cadence",
      "Internal agent handoff map",
    ],
  },
  {
    title: "Analytics suite",
    href: "/ops/analytics",
    eyebrow: "Revenue visibility",
    summary:
      "A compact commercial dashboard for funnel quality, velocity, CAC payback, and operating recommendations.",
    bullets: [
      "Pipeline conversion math",
      "Payback and efficiency guidance",
      "Internal scorecard language",
    ],
  },
];

export default function OpsHomePage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <article className="ops-card">
        <span className="eyebrow">
          <span className="brand-dot" />
          Why this exists
        </span>
        <h2 className="mt-6 text-3xl font-medium text-[var(--paper)]">
          Keep internal GTM tooling out of the public buying experience.
        </h2>
        <p className="section-copy mt-5 leading-8">
          This portal is intentionally separated from the customer-facing
          homepage. It is designed for internal operators who need a practical
          place to run prospecting, campaign planning, and commercial analytics
          without exposing methods, tactics, or internal workflows to buyers.
        </p>
      </article>
      <div className="grid gap-5 md:grid-cols-3">
        {suites.map((suite) => (
          <article key={suite.title} className="ops-card">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--brand)]">
              {suite.eyebrow}
            </p>
            <h3 className="mt-4 text-2xl font-medium text-[var(--paper)]">
              {suite.title}
            </h3>
            <p className="section-copy mt-4 text-sm leading-7">{suite.summary}</p>
            <ul className="mt-5 space-y-3">
              {suite.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-[var(--muted)]">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--brand)]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <Link href={suite.href} className="ops-link mt-6 inline-flex">
              Open suite
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

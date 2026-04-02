"use client";

import { useMemo, useState } from "react";

function currency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function AnalyticsSuite() {
  const [leads, setLeads] = useState(140);
  const [meetings, setMeetings] = useState(26);
  const [proposals, setProposals] = useState(9);
  const [wins, setWins] = useState(3);
  const [spend, setSpend] = useState(6200);
  const [avgDeal, setAvgDeal] = useState(7200);

  const inputs = [
    { label: "Leads", value: leads, setter: setLeads },
    { label: "Meetings", value: meetings, setter: setMeetings },
    { label: "Proposals", value: proposals, setter: setProposals },
    { label: "Wins", value: wins, setter: setWins },
    { label: "Monthly spend", value: spend, setter: setSpend },
    { label: "Average deal", value: avgDeal, setter: setAvgDeal },
  ];

  const metrics = useMemo(() => {
    const leadToMeeting = leads ? (meetings / leads) * 100 : 0;
    const meetingToProposal = meetings ? (proposals / meetings) * 100 : 0;
    const proposalToWin = proposals ? (wins / proposals) * 100 : 0;
    const revenue = wins * avgDeal;
    const cac = wins ? spend / wins : 0;
    const roas = spend ? revenue / spend : 0;

    return {
      leadToMeeting,
      meetingToProposal,
      proposalToWin,
      revenue,
      cac,
      roas,
    };
  }, [avgDeal, leads, meetings, proposals, spend, wins]);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="ops-card">
        <span className="eyebrow">
          <span className="brand-dot" />
          Analytics suite
        </span>
        <h2 className="mt-6 text-3xl font-medium text-[var(--paper)]">
          Keep the commercial scorecard brutally simple.
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {inputs.map((input) => (
            <label key={input.label} className="block">
              <span className="mb-2 block text-sm text-[var(--muted)]">
                {input.label}
              </span>
              <input
                type="number"
                min={0}
                value={input.value}
                onChange={(event) => input.setter(Number(event.target.value))}
                className="ops-input"
              />
            </label>
          ))}
        </div>
      </section>

      <section className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <article className="ops-metric">
            <p className="text-sm text-[var(--muted)]">Lead to meeting</p>
            <p className="mt-3 text-3xl font-semibold text-[var(--paper)]">
              {metrics.leadToMeeting.toFixed(1)}%
            </p>
          </article>
          <article className="ops-metric">
            <p className="text-sm text-[var(--muted)]">Meeting to proposal</p>
            <p className="mt-3 text-3xl font-semibold text-[var(--paper)]">
              {metrics.meetingToProposal.toFixed(1)}%
            </p>
          </article>
          <article className="ops-metric">
            <p className="text-sm text-[var(--muted)]">Proposal to win</p>
            <p className="mt-3 text-3xl font-semibold text-[var(--paper)]">
              {metrics.proposalToWin.toFixed(1)}%
            </p>
          </article>
          <article className="ops-metric">
            <p className="text-sm text-[var(--muted)]">Revenue</p>
            <p className="mt-3 text-3xl font-semibold text-[var(--paper)]">
              {currency(metrics.revenue)}
            </p>
          </article>
          <article className="ops-metric">
            <p className="text-sm text-[var(--muted)]">CAC</p>
            <p className="mt-3 text-3xl font-semibold text-[var(--paper)]">
              {currency(metrics.cac)}
            </p>
          </article>
          <article className="ops-metric">
            <p className="text-sm text-[var(--muted)]">ROAS</p>
            <p className="mt-3 text-3xl font-semibold text-[var(--paper)]">
              {metrics.roas.toFixed(1)}x
            </p>
          </article>
        </div>

        <article className="ops-card">
          <h3 className="text-2xl font-medium text-[var(--paper)]">
            Operating readout
          </h3>
          <div className="mt-5 grid gap-3">
            {[
              metrics.leadToMeeting < 12
                ? "Top of funnel quality is weak or the first response time is still too slow."
                : "Lead capture and first response quality look healthy enough to scale.",
              metrics.meetingToProposal < 25
                ? "Discovery quality or qualification discipline needs attention before adding more spend."
                : "Meeting qualification is converting into proposals at a workable rate.",
              metrics.proposalToWin < 25
                ? "Proposal positioning or commercial follow-up is likely leaking revenue."
                : "Proposal conversion is strong enough to justify more volume.",
            ].map((item) => (
              <div key={item} className="ops-row">
                <span className="ops-dot" />
                <p className="text-sm leading-7 text-[var(--muted)]">{item}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

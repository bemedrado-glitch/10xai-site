"use client";

import { useMemo, useState } from "react";

const availableChannels = ["LinkedIn", "Email", "Website", "WhatsApp", "Instagram"];

export default function MarketingSuite() {
  const [goal, setGoal] = useState("Book more qualified consultations");
  const [message, setMessage] = useState("Operational AI for SMBs that need visible wins fast");
  const [velocity, setVelocity] = useState(6);
  const [channels, setChannels] = useState(["LinkedIn", "Email", "Website"]);

  const weeklyAssets = useMemo(
    () =>
      channels.map((channel, index) => ({
        channel,
        quantity: Math.max(1, Math.round((velocity + index) / 2)),
      })),
    [channels, velocity],
  );

  function toggleChannel(channel: string) {
    setChannels((current) =>
      current.includes(channel)
        ? current.filter((item) => item !== channel)
        : [...current, channel],
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="ops-card">
        <span className="eyebrow">
          <span className="brand-dot" />
          Marketing suite
        </span>
        <h2 className="mt-6 text-3xl font-medium text-[var(--paper)]">
          Turn campaign planning into a predictable weekly sprint.
        </h2>
        <div className="mt-8 grid gap-4">
          <label className="block">
            <span className="mb-2 block text-sm text-[var(--muted)]">
              Sprint goal
            </span>
            <input
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              className="ops-input"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-[var(--muted)]">
              Message spine
            </span>
            <textarea
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="ops-input"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-[var(--muted)]">
              Asset velocity / week
            </span>
            <input
              type="range"
              min={2}
              max={18}
              value={velocity}
              onChange={(event) => setVelocity(Number(event.target.value))}
              className="w-full accent-[var(--brand)]"
            />
            <span className="mt-2 block text-lg text-[var(--paper)]">
              {velocity}
            </span>
          </label>
        </div>
      </section>

      <section className="grid gap-5">
        <article className="ops-card">
          <h3 className="text-2xl font-medium text-[var(--paper)]">
            Active channels
          </h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {availableChannels.map((channel) => {
              const active = channels.includes(channel);

              return (
                <button
                  key={channel}
                  type="button"
                  onClick={() => toggleChannel(channel)}
                  className={`ops-chip ${active ? "ops-chip-active" : ""}`}
                >
                  {channel}
                </button>
              );
            })}
          </div>
        </article>

        <article className="ops-card">
          <h3 className="text-2xl font-medium text-[var(--paper)]">
            Agentic campaign flow
          </h3>
          <div className="mt-5 grid gap-3">
            {[
              "Planner agent: turns the sprint goal into a weekly theme and channel breakdown.",
              "Copy agent: drafts hooks, post copy, and email angles from the message spine.",
              "Media agent: generates visual asset prompts and packaging notes.",
              "Ops agent: schedules, routes approvals, and tracks what actually shipped.",
            ].map((item) => (
              <div key={item} className="ops-row">
                <span className="ops-dot" />
                <p className="text-sm leading-7 text-[var(--muted)]">{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="ops-card">
          <h3 className="text-2xl font-medium text-[var(--paper)]">
            Weekly output plan
          </h3>
          <p className="section-copy mt-3 text-sm leading-7">{goal}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {weeklyAssets.map((item) => (
              <div key={item.channel} className="ops-metric">
                <p className="text-sm text-[var(--muted)]">{item.channel}</p>
                <p className="mt-3 text-3xl font-semibold text-[var(--paper)]">
                  {item.quantity}
                </p>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Assets to publish this week
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-[1.4rem] border border-[var(--line)] bg-white/4 p-4 text-sm leading-7 text-[var(--muted)]">
            Message spine: {message}
          </div>
        </article>
      </section>
    </div>
  );
}

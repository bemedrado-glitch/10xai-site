import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  DEFAULT_BOOKING_PATH,
  getConfiguredBookingUrl,
  isGoogleCalendarBookingUrl,
} from "../../lib/booking";

export const metadata: Metadata = {
  title: "Book a Call | 10XAI",
  description:
    "Book a consultation with 10XAI using our live Google Calendar scheduling link.",
};

export default function BookPage() {
  const bookingUrl = getConfiguredBookingUrl();

  if (bookingUrl) {
    redirect(bookingUrl);
  }

  return (
    <main className="noise-overlay min-h-screen overflow-x-hidden px-5 py-20 sm:px-8">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[var(--line)] bg-[rgba(7,14,28,0.82)] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <span className="eyebrow">
          <span className="brand-dot" />
          Booking setup
        </span>
        <h1 className="display-title mt-8 text-4xl font-semibold tracking-[-0.05em] text-[var(--paper)] sm:text-5xl">
          The live booking link still needs to be configured.
        </h1>
        <p className="section-copy mt-6 text-lg leading-8">
          Set <code>NEXT_PUBLIC_BOOKING_URL</code> to your public Google Calendar
          appointment schedule link and this page will automatically redirect
          visitors into your real booking flow.
        </p>
        <div className="mt-8 rounded-[1.5rem] border border-[var(--line)] bg-white/4 p-5 text-sm leading-7 text-[var(--muted)]">
          <p>
            Supported examples include public Google Calendar booking pages such
            as <code>https://calendar.app.google/...</code> or{" "}
            <code>
              https://calendar.google.com/calendar/u/0/appointments/schedules/...
            </code>
            .
          </p>
          <p className="mt-4">
            Current internal fallback route: <code>{DEFAULT_BOOKING_PATH}</code>
          </p>
          <p className="mt-4">
            Google link detected example:{" "}
            <strong>
              {String(
                isGoogleCalendarBookingUrl(
                  "https://calendar.app.google/example-booking-link",
                ),
              )}
            </strong>
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3.5 text-base font-medium text-[var(--background)] hover:-translate-y-0.5"
          >
            Back to homepage
          </Link>
          <a
            href="mailto:contato@10xai.us?subject=Booking%20link%20setup"
            className="inline-flex items-center justify-center rounded-full border border-[var(--line-strong)] px-6 py-3.5 text-base font-medium text-[var(--paper)] hover:border-[var(--brand)]"
          >
            Send booking link
          </a>
        </div>
      </section>
    </main>
  );
}

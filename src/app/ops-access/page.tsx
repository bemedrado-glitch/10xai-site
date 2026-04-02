import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginToInternalPortal } from "./actions";
import {
  hasInternalPortalPassword,
  INTERNAL_PORTAL_COOKIE,
  INTERNAL_PORTAL_HOME,
  isAuthorizedInternalPortalSession,
} from "../../lib/internal-portal";

export const metadata: Metadata = {
  title: "Internal Access | 10XAI",
  robots: {
    index: false,
    follow: false,
  },
};

type Props = {
  searchParams: Promise<{ error?: string }>;
};

const errorCopy: Record<string, string> = {
  invalid: "The password did not match the current internal portal access code.",
  missing:
    "No internal portal password is configured yet. Add INTERNAL_PORTAL_PASSWORD to your environment first.",
};

export default async function OpsAccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(INTERNAL_PORTAL_COOKIE)?.value;

  if (isAuthorizedInternalPortalSession(sessionCookie)) {
    redirect(INTERNAL_PORTAL_HOME);
  }

  const passwordReady = hasInternalPortalPassword();
  const errorMessage = params.error ? errorCopy[params.error] : null;

  return (
    <main className="noise-overlay min-h-screen overflow-x-hidden px-5 py-20 sm:px-8">
      <section className="mx-auto max-w-2xl rounded-[2rem] border border-[var(--line)] bg-[rgba(7,14,28,0.84)] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
        <span className="eyebrow">
          <span className="brand-dot" />
          Internal access only
        </span>
        <h1 className="display-title mt-8 text-4xl font-semibold tracking-[-0.05em] text-[var(--paper)] sm:text-5xl">
          10XAI operator suites
        </h1>
        <p className="section-copy mt-6 text-lg leading-8">
          This area contains internal sales, marketing, and analytics systems.
          It is intentionally hidden from the public site and protected by a
          server-side password gate.
        </p>

        {errorMessage ? (
          <div className="mt-6 rounded-[1.25rem] border border-[rgba(255,126,126,0.45)] bg-[rgba(85,24,31,0.34)] px-4 py-3 text-sm text-[var(--paper)]">
            {errorMessage}
          </div>
        ) : null}

        {!passwordReady ? (
          <div className="mt-8 rounded-[1.5rem] border border-[var(--line)] bg-white/4 p-5 text-sm leading-7 text-[var(--muted)]">
            Add <code>INTERNAL_PORTAL_PASSWORD</code> to your environment to
            unlock this portal.
          </div>
        ) : (
          <form action={loginToInternalPortal} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm text-[var(--muted)]">
                Internal password
              </span>
              <input
                type="password"
                name="password"
                required
                className="w-full rounded-2xl border border-[var(--line)] bg-[rgba(7,14,28,0.44)] px-4 py-3 text-[var(--paper)] outline-none focus:border-[var(--brand)]"
                placeholder="Enter access code"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3.5 text-base font-medium text-[var(--background)] hover:-translate-y-0.5"
            >
              Enter internal portal
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

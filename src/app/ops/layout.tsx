import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logoutFromInternalPortal } from "../ops-access/actions";
import {
  INTERNAL_PORTAL_COOKIE,
  INTERNAL_PORTAL_LOGIN_PATH,
  isAuthorizedInternalPortalSession,
} from "../../lib/internal-portal";

export const metadata: Metadata = {
  title: "Internal Operations | 10XAI",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function OpsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(INTERNAL_PORTAL_COOKIE)?.value;

  if (!isAuthorizedInternalPortalSession(sessionCookie)) {
    redirect(INTERNAL_PORTAL_LOGIN_PATH);
  }

  return (
    <main className="noise-overlay min-h-screen overflow-x-hidden px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="ops-shell mb-8 flex flex-col gap-5 rounded-[2rem] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="eyebrow">
              <span className="brand-dot" />
              Internal operator portal
            </span>
            <h1 className="display-title mt-5 text-3xl font-semibold tracking-[-0.04em] text-[var(--paper)] sm:text-4xl">
              Hidden GTM systems for 10XAI
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/ops" className="ops-chip">
              Overview
            </Link>
            <Link href="/ops/sales" className="ops-chip">
              Sales
            </Link>
            <Link href="/ops/marketing" className="ops-chip">
              Marketing
            </Link>
            <Link href="/ops/analytics" className="ops-chip">
              Analytics
            </Link>
            <form action={logoutFromInternalPortal}>
              <button type="submit" className="ops-chip ops-chip-danger">
                Lock portal
              </button>
            </form>
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}

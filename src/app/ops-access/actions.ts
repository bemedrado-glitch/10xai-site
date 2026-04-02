"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getInternalPortalToken,
  hasInternalPortalPassword,
  INTERNAL_PORTAL_COOKIE,
  INTERNAL_PORTAL_HOME,
  INTERNAL_PORTAL_LOGIN_PATH,
  validateInternalPortalPassword,
} from "../../lib/internal-portal";

export async function loginToInternalPortal(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!hasInternalPortalPassword()) {
    redirect(`${INTERNAL_PORTAL_LOGIN_PATH}?error=missing`);
  }

  if (!validateInternalPortalPassword(password)) {
    redirect(`${INTERNAL_PORTAL_LOGIN_PATH}?error=invalid`);
  }

  const cookieStore = await cookies();

  cookieStore.set(INTERNAL_PORTAL_COOKIE, getInternalPortalToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  redirect(INTERNAL_PORTAL_HOME);
}

export async function logoutFromInternalPortal() {
  const cookieStore = await cookies();

  cookieStore.delete(INTERNAL_PORTAL_COOKIE);
  redirect(INTERNAL_PORTAL_LOGIN_PATH);
}

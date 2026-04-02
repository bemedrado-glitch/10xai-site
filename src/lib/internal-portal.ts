import { createHash } from "node:crypto";

export const INTERNAL_PORTAL_COOKIE = "tenx_internal_ops";
export const INTERNAL_PORTAL_LOGIN_PATH = "/ops-access";
export const INTERNAL_PORTAL_HOME = "/ops";

function normalizePassword(value = process.env.INTERNAL_PORTAL_PASSWORD) {
  return value?.trim() ?? "";
}

export function hasInternalPortalPassword() {
  return normalizePassword().length > 0;
}

export function getInternalPortalToken(password = normalizePassword()) {
  if (!password) {
    return "";
  }

  return createHash("sha256").update(`10xai-ops:${password}`).digest("hex");
}

export function validateInternalPortalPassword(password: string) {
  const configured = normalizePassword();

  if (!configured) {
    return false;
  }

  return password.trim() === configured;
}

export function isAuthorizedInternalPortalSession(cookieValue?: string) {
  const token = getInternalPortalToken();

  if (!token || !cookieValue) {
    return false;
  }

  return cookieValue === token;
}

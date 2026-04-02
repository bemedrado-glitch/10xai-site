export const DEFAULT_BOOKING_PATH = "/book";

const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;
const GOOGLE_BOOKING_HOST_PATTERN =
  /^https:\/\/(calendar\.app\.google|calendar\.google\.com)\//i;

export function getConfiguredBookingUrl(rawUrl = process.env.NEXT_PUBLIC_BOOKING_URL) {
  const candidate = rawUrl?.trim();

  if (!candidate || !ABSOLUTE_URL_PATTERN.test(candidate)) {
    return null;
  }

  return candidate;
}

export function getBookingCtaHref(rawUrl = process.env.NEXT_PUBLIC_BOOKING_URL) {
  return getConfiguredBookingUrl(rawUrl) ?? DEFAULT_BOOKING_PATH;
}

export function isGoogleCalendarBookingUrl(url: string) {
  return GOOGLE_BOOKING_HOST_PATTERN.test(url);
}

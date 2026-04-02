import {
  DEFAULT_BOOKING_PATH,
  getBookingCtaHref,
  getConfiguredBookingUrl,
  isGoogleCalendarBookingUrl,
} from "./booking";

describe("booking helpers", () => {
  it("returns null when no public booking URL is configured", () => {
    expect(getConfiguredBookingUrl("")).toBeNull();
    expect(getConfiguredBookingUrl(undefined)).toBeNull();
  });

  it("accepts only absolute http and https booking URLs", () => {
    expect(getConfiguredBookingUrl("https://calendar.app.google/example")).toBe(
      "https://calendar.app.google/example",
    );
    expect(getConfiguredBookingUrl("http://example.com/book")).toBe(
      "http://example.com/book",
    );
    expect(getConfiguredBookingUrl("/book")).toBeNull();
  });

  it("falls back to the internal booking route for site CTAs", () => {
    expect(getBookingCtaHref("")).toBe(DEFAULT_BOOKING_PATH);
    expect(getBookingCtaHref("https://calendar.app.google/example")).toBe(
      "https://calendar.app.google/example",
    );
  });

  it("recognizes Google Calendar booking links", () => {
    expect(
      isGoogleCalendarBookingUrl("https://calendar.app.google/abcd1234"),
    ).toBe(true);
    expect(
      isGoogleCalendarBookingUrl(
        "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ123",
      ),
    ).toBe(true);
    expect(isGoogleCalendarBookingUrl("https://cal.com/10xai")).toBe(false);
  });
});

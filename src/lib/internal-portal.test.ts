import {
  getInternalPortalToken,
  hasInternalPortalPassword,
  isAuthorizedInternalPortalSession,
  validateInternalPortalPassword,
} from "./internal-portal";

describe("internal portal helpers", () => {
  const originalPassword = process.env.INTERNAL_PORTAL_PASSWORD;

  beforeEach(() => {
    process.env.INTERNAL_PORTAL_PASSWORD = "4885";
  });

  afterAll(() => {
    process.env.INTERNAL_PORTAL_PASSWORD = originalPassword;
  });

  it("recognizes when a password is configured", () => {
    expect(hasInternalPortalPassword()).toBe(true);
  });

  it("validates the submitted internal password", () => {
    expect(validateInternalPortalPassword("4885")).toBe(true);
    expect(validateInternalPortalPassword("1234")).toBe(false);
  });

  it("authorizes only matching session tokens", () => {
    const token = getInternalPortalToken("4885");

    expect(isAuthorizedInternalPortalSession(token)).toBe(true);
    expect(isAuthorizedInternalPortalSession("bad-token")).toBe(false);
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page, {
  buildBriefEmail,
  CONTACT_EMAIL,
  detectInitialLanguage,
} from "./page";

describe("language helpers", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("prefers stored language over browser locale", () => {
    window.localStorage.setItem("10xai-language", "es");
    Object.defineProperty(window.navigator, "language", {
      configurable: true,
      value: "pt-BR",
    });

    expect(detectInitialLanguage()).toBe("es");
  });

  it("falls back to browser locale when storage is empty", () => {
    Object.defineProperty(window.navigator, "language", {
      configurable: true,
      value: "pt-BR",
    });

    expect(detectInitialLanguage()).toBe("pt");
  });
});

describe("buildBriefEmail", () => {
  it("builds a mailto URL with encoded subject and body", () => {
    const result = buildBriefEmail({
      language: "en",
      name: "Ana",
      company: "Acme",
      email: "ana@example.com",
      challenge: "Sales follow-up is slow",
      monthlyRecovered: 4200,
      recommendedSystem: "AI sales playbook plus operating CRM",
    });

    expect(result).toContain(`mailto:${CONTACT_EMAIL}`);
    expect(result).toContain(encodeURIComponent("10XAI brief from Acme"));
    expect(result).toContain(encodeURIComponent("Sales follow-up is slow"));
    expect(result).toContain(encodeURIComponent("$4,200"));
  });
});

describe("Home page", () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(window.navigator, "language", {
      configurable: true,
      value: "en-US",
    });
  });

  it("renders the English hero by default", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", {
        name: /make your company feel faster where customers and teams notice first/i,
      }),
    ).toBeInTheDocument();
  });

  it("switches languages from the header control", async () => {
    const user = userEvent.setup();
    render(<Page />);

    await user.click(screen.getByRole("button", { name: "PT-BR" }));

    expect(
      screen.getByRole("heading", {
        name: /faca sua empresa parecer mais rapida onde clientes e equipes percebem primeiro/i,
      }),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(document.documentElement.lang).toBe("pt-BR");
    });
  });

  it("updates the selected system panel when a system button is clicked", async () => {
    const user = userEvent.setup();
    render(<Page />);

    await user.click(
      screen.getByRole("button", {
        name: /marketing automation with autonomous agents/i,
      }),
    );

    expect(
      screen.getAllByRole("heading", {
        name: /marketing automation with autonomous agents/i,
      }),
    ).toHaveLength(2);
    expect(
      screen.getByText(/the brand shows up with more discipline/i),
    ).toBeInTheDocument();
  });

  it("renders the qualified brief form fields", () => {
    render(<Page />);

    expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^company$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        /which business system should your company stop postponing\?/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /prepare email draft/i }),
    ).toBeInTheDocument();
  });
});

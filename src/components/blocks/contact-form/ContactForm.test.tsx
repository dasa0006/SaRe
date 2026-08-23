import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { ContactForm } from "./ContactForm";
import type { ContactFormProps } from "./ContactForm.types";

const props: ContactFormProps = {
  nameLabel: "Name",
  emailLabel: "Email",
  messageLabel: "Message",
  submitLabel: "Send message",
  successMessage: "Message sent.",
  errorMessage: "Something went wrong.",
  nameError: "Please enter your name.",
  emailError: "Please enter a valid email address.",
  messageError: "Please enter your message.",
  fallbackEmail: "gustav@example.com",
  fallbackLabel: "Prefer email?",
};

function renderForm(
  locale: "en" | "da" = "en",
  overrides: Partial<ContactFormProps> = {}
) {
  return render(
    <NextIntlClientProvider locale={locale} messages={{}}>
      <ContactForm {...props} {...overrides} />
    </NextIntlClientProvider>
  );
}

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
  await user.type(screen.getByLabelText("Email"), "ada@example.com");
  await user.type(screen.getByLabelText("Message"), "I need a new website.");
}

const okJson = () =>
  new Response(JSON.stringify({ ok: true }), { status: 200 });

describe("ContactForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the three fields, their labels and the submit button", () => {
    renderForm();

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Send message" })
    ).toBeInTheDocument();
  });

  it("renders the static mailto fallback line below the form", () => {
    renderForm();

    const fallback = screen.getByText(/Prefer email\?/);
    expect(fallback.querySelector("a")).toHaveAttribute(
      "href",
      "mailto:gustav@example.com"
    );
  });

  it("validates client-side with zod and shows per-field errors without fetching", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    renderForm();
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(
      await screen.findByText("Please enter your name.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please enter a valid email address.")
    ).toBeInTheDocument();
    expect(screen.getByText("Please enter your message.")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();

    vi.unstubAllGlobals();
  });

  it("marks invalid fields with aria-invalid and clears the errors on a valid retry", async () => {
    const fetchMock = vi.fn().mockResolvedValue(okJson());
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    renderForm();
    await user.click(screen.getByRole("button", { name: "Send message" }));

    const nameInput = screen.getByLabelText("Name");
    expect(nameInput).toHaveAttribute("aria-invalid", "true");

    await user.type(nameInput, "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Message"), "Hello");

    await user.click(screen.getByRole("button", { name: "Send message" }));

    await waitFor(() => {
      expect(
        screen.queryByText("Please enter your name.")
      ).not.toBeInTheDocument();
    });
    expect(nameInput).not.toHaveAttribute("aria-invalid");

    vi.unstubAllGlobals();
  });

  it("posts the payload to /api/contact with the current locale and shows the success message", async () => {
    const fetchMock = vi.fn().mockResolvedValue(okJson());
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    renderForm("da");
    await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Message"), "Hej!");

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByText("Message sent.")).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(String(init.body))).toEqual({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Hej!",
      locale: "da",
    });

    vi.unstubAllGlobals();
  });

  it("shows the inline error and mailto reminder when the server rejects", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ error: "nope" }), { status: 500 })
      );
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    renderForm();
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Something went wrong.");
    const mailto = alert.querySelector("a");
    expect(mailto).toHaveAttribute("href", "mailto:gustav@example.com");

    vi.unstubAllGlobals();
  });

  it("shows the inline error and mailto reminder when the network fails", async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValue(new TypeError("Failed to fetch"));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    renderForm();
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Something went wrong.");
    expect(alert.querySelector("a")).toHaveAttribute(
      "href",
      "mailto:gustav@example.com"
    );

    vi.unstubAllGlobals();
  });

  it("disables the submit button while sending, then re-enables it after success", async () => {
    let resolveFetch!: (_value: Response) => void;
    const fetchMock = vi.fn(
      () =>
        new Promise<Response>((resolve) => {
          resolveFetch = resolve;
        })
    );
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    renderForm();
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));

    const button = screen.getByRole("button", { name: "Send message" });
    expect(button).toBeDisabled();

    resolveFetch(okJson());
    await screen.findByText("Message sent.");
    // A success is not a dead end — the sender can write again.
    expect(button).toBeEnabled();

    vi.unstubAllGlobals();
  });
});

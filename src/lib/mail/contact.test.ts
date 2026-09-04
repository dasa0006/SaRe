import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ContactFormData } from "@/lib/contact/schema";

vi.mock("nodemailer", () => ({
  default: { createTransport: vi.fn(() => ({ sendMail: vi.fn() })) },
}));

import nodemailer from "nodemailer";
import { buildContactMail, sendContactEmail } from "./contact";
import { getMailConfig } from "./config";

vi.mock("./config", () => ({
  getMailConfig: vi.fn(),
}));

const mockedGetMailConfig = vi.mocked(getMailConfig);
const mockedCreateTransport = vi.mocked(nodemailer.createTransport);

const submission: ContactFormData = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "I would like to modernise my website.",
  locale: "en",
};

const config = {
  SMTP_HOST: "smtp.gmail.com",
  SMTP_PORT: 587,
  SMTP_USER: "sender@example.com",
  SMTP_PASS: "app-password",
  CONTACT_RECIPIENT: "recipient@example.com",
};

beforeEach(() => {
  vi.clearAllMocks();
  mockedGetMailConfig.mockReturnValue(config);
});

describe("buildContactMail", () => {
  it("sends to the recipient, from the SMTP account, with Reply-To = submitter", () => {
    const mail = buildContactMail(submission, config);

    expect(mail.to).toBe(config.CONTACT_RECIPIENT);
    expect(mail.from).toBe(config.SMTP_USER);
    expect(mail.replyTo).toBe(submission.email);
  });

  it("builds a locale-aware subject so DA vs EN is discernible at a glance", () => {
    expect(buildContactMail(submission, config).subject).toBe(
      "[EN] Website contact: Ada Lovelace"
    );

    const danish = buildContactMail({ ...submission, locale: "da" }, config);
    expect(danish.subject).toBe("[DA] Kontakt via hjemmesiden: Ada Lovelace");
  });

  it("includes all form fields in the body", () => {
    const mail = buildContactMail(submission, config);
    const body = String(mail.text);

    expect(body).toContain(submission.name);
    expect(body).toContain(submission.email);
    expect(body).toContain(submission.message);
    expect(body).toContain("en");
  });
});

describe("sendContactEmail", () => {
  it("creates a Gmail-compatible SMTP transporter with app-password auth", async () => {
    await sendContactEmail(submission);

    expect(mockedCreateTransport).toHaveBeenCalledWith({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: false,
      auth: { user: config.SMTP_USER, pass: config.SMTP_PASS },
    });
  });

  it("uses secure mode for port 465", async () => {
    mockedGetMailConfig.mockReturnValue({ ...config, SMTP_PORT: 465 });

    await sendContactEmail(submission);

    expect(mockedCreateTransport).toHaveBeenCalledWith(
      expect.objectContaining({ secure: true })
    );
  });

  it("sends the built mail", async () => {
    const sendMail = vi.fn().mockResolvedValue({ messageId: "1" });
    mockedCreateTransport.mockReturnValue({
      sendMail,
    } as unknown as ReturnType<typeof nodemailer.createTransport>);

    await sendContactEmail(submission);

    expect(sendMail).toHaveBeenCalledWith(buildContactMail(submission, config));
  });

  it("propagates transporter errors", async () => {
    const sendMail = vi.fn().mockRejectedValue(new Error("SMTP refused"));
    mockedCreateTransport.mockReturnValue({
      sendMail,
    } as unknown as ReturnType<typeof nodemailer.createTransport>);

    await expect(sendContactEmail(submission)).rejects.toThrow("SMTP refused");
  });

  it("propagates missing-configuration errors", async () => {
    mockedGetMailConfig.mockImplementation(() => {
      throw new Error("Missing contact-form mail configuration");
    });

    await expect(sendContactEmail(submission)).rejects.toThrow(
      "Missing contact-form mail configuration"
    );
  });
});

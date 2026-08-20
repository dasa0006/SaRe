import { afterEach, describe, expect, it } from "vitest";
import { getMailConfig } from "./config";

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

describe("getMailConfig", () => {
  it("returns the SMTP and recipient configuration from the environment", () => {
    process.env.SMTP_HOST = "smtp.example.com";
    process.env.SMTP_PORT = "465";
    process.env.SMTP_USER = "sender@example.com";
    process.env.SMTP_PASS = "app-password";
    process.env.CONTACT_RECIPIENT = "recipient@example.com";

    expect(getMailConfig()).toEqual({
      SMTP_HOST: "smtp.example.com",
      SMTP_PORT: 465,
      SMTP_USER: "sender@example.com",
      SMTP_PASS: "app-password",
      CONTACT_RECIPIENT: "recipient@example.com",
    });
  });

  it("defaults to Gmail SMTP host and port 587", () => {
    process.env.SMTP_USER = "sender@example.com";
    process.env.SMTP_PASS = "app-password";
    process.env.CONTACT_RECIPIENT = "recipient@example.com";

    const config = getMailConfig();
    expect(config.SMTP_HOST).toBe("smtp.gmail.com");
    expect(config.SMTP_PORT).toBe(587);
  });

  it("coerces a string port to a number", () => {
    process.env.SMTP_PORT = "587";
    process.env.SMTP_USER = "sender@example.com";
    process.env.SMTP_PASS = "app-password";
    process.env.CONTACT_RECIPIENT = "recipient@example.com";

    expect(getMailConfig().SMTP_PORT).toBe(587);
  });

  it("throws a descriptive error when SMTP credentials are missing", () => {
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    process.env.CONTACT_RECIPIENT = "recipient@example.com";

    expect(() => getMailConfig()).toThrow(/SMTP/);
  });

  it("throws when the recipient address is missing or invalid", () => {
    process.env.SMTP_USER = "sender@example.com";
    process.env.SMTP_PASS = "app-password";
    delete process.env.CONTACT_RECIPIENT;

    expect(() => getMailConfig()).toThrow(/CONTACT_RECIPIENT/);

    process.env.CONTACT_RECIPIENT = "not-an-email";
    expect(() => getMailConfig()).toThrow(/CONTACT_RECIPIENT/);
  });
});

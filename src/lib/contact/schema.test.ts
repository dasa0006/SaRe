import { describe, expect, it } from "vitest";
import { contactSchema } from "./schema";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "I would like to modernise my website.",
};

describe("contactSchema", () => {
  it("accepts a valid submission", () => {
    const result = contactSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe(valid.name);
      expect(result.data.email).toBe(valid.email);
      expect(result.data.message).toBe(valid.message);
    }
  });

  it("trims surrounding whitespace from all fields", () => {
    const result = contactSchema.safeParse({
      name: "  Ada Lovelace  ",
      email: "  ada@example.com ",
      message: "  Hello  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Ada Lovelace");
      expect(result.data.email).toBe("ada@example.com");
      expect(result.data.message).toBe("Hello");
    }
  });

  it("rejects an empty or whitespace-only name", () => {
    expect(contactSchema.safeParse({ ...valid, name: "" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, name: "   " }).success).toBe(
      false
    );
  });

  it("rejects an empty or whitespace-only message", () => {
    expect(contactSchema.safeParse({ ...valid, message: "" }).success).toBe(
      false
    );
    expect(contactSchema.safeParse({ ...valid, message: "   " }).success).toBe(
      false
    );
  });

  it("rejects a malformed email", () => {
    expect(
      contactSchema.safeParse({ ...valid, email: "not-an-email" }).success
    ).toBe(false);
    expect(contactSchema.safeParse({ ...valid, email: "ada@" }).success).toBe(
      false
    );
  });

  it("rejects an overlong name or message", () => {
    expect(
      contactSchema.safeParse({ ...valid, name: "x".repeat(201) }).success
    ).toBe(false);
    expect(
      contactSchema.safeParse({ ...valid, message: "x".repeat(5001) }).success
    ).toBe(false);
  });

  it("defaults the locale to en when omitted", () => {
    const result = contactSchema.safeParse({
      name: valid.name,
      email: valid.email,
      message: valid.message,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.locale).toBe("en");
    }
  });

  it("accepts the da locale", () => {
    const result = contactSchema.safeParse({ ...valid, locale: "da" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.locale).toBe("da");
    }
  });

  it("rejects an unknown locale", () => {
    expect(contactSchema.safeParse({ ...valid, locale: "de" }).success).toBe(
      false
    );
  });
});

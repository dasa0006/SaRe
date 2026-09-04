import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";
import { sendContactEmail } from "@/lib/mail/contact";

vi.mock("@/lib/mail/contact", () => ({
  sendContactEmail: vi.fn(),
}));

const mockedSend = vi.mocked(sendContactEmail);

const validPayload = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "I would like to modernise my website.",
  locale: "en",
};

function post(payload: unknown): Promise<Response> {
  return POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: typeof payload === "string" ? payload : JSON.stringify(payload),
    })
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  mockedSend.mockResolvedValue();
});

describe("POST /api/contact", () => {
  it("sends a valid submission and returns 200", async () => {
    const response = await post(validPayload);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(mockedSend).toHaveBeenCalledWith(validPayload);
  });

  it("defaults the locale to en when the form omits it", async () => {
    await post({
      name: validPayload.name,
      email: validPayload.email,
      message: validPayload.message,
    });

    expect(mockedSend).toHaveBeenCalledWith({ ...validPayload, locale: "en" });
  });

  it("trims and forwards a whitespace-padded submission", async () => {
    await post({
      name: "  Ada Lovelace  ",
      email: "  ada@example.com ",
      message: "  Hello  ",
    });

    expect(mockedSend).toHaveBeenCalledWith({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Hello",
      locale: "en",
    });
  });

  it("rejects a malformed JSON body with 400", async () => {
    const response = await post("{not json");

    expect(response.status).toBe(400);
    expect(mockedSend).not.toHaveBeenCalled();
  });

  it("rejects an invalid payload with 400 and does not send", async () => {
    const response = await post({
      name: "",
      email: "not-an-email",
      message: "",
    });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: expect.any(String),
    });
    expect(mockedSend).not.toHaveBeenCalled();
  });

  it("rejects an unknown locale with 400", async () => {
    const response = await post({ ...validPayload, locale: "de" });

    expect(response.status).toBe(400);
    expect(mockedSend).not.toHaveBeenCalled();
  });

  it("returns 500 when the mail transport fails", async () => {
    mockedSend.mockRejectedValue(new Error("SMTP refused"));

    const response = await post(validPayload);

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toMatchObject({
      error: expect.any(String),
    });
  });
});

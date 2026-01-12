import { expect, test } from "vitest";
import { getJwtPayload } from "../../src/utils/jwt";

test("returns null for empty token", () => {
  expect(getJwtPayload("")).toBeNull();
});

test("decodes a valid JWT payload", () => {
  const payload = { sub: 123, role: "user" };
  const encoded = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
  const token = `header.${encoded}.signature`;

  expect(getJwtPayload(token)).toEqual(payload);
});

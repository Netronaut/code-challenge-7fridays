import { test, expect, describe } from "bun:test";
import { formatCurrency } from "./format";

describe("format", () => {
  test("should format currency", () => {
    expect(formatCurrency(100)).toMatch("100,00\xa0€");
  });
});

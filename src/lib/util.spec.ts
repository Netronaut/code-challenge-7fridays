import { expect, test, describe } from "bun:test";
import { sortBy } from "./util";

describe("util", () => {
  test("should sort by prop", () => {
    expect(
      [{ propA: "ghi" }, { propA: "abc" }, { propA: "def" }].sort(
        sortBy("propA")
      )
    ).toEqual([{ propA: "abc" }, { propA: "def" }, { propA: "ghi" }]);
  });

  test("should sort by prop descending", () => {
    expect(
      [{ propA: "ghi" }, { propA: "abc" }, { propA: "def" }].sort(
        sortBy("propA", "desc")
      )
    ).toEqual([{ propA: "ghi" }, { propA: "def" }, { propA: "abc" }]);
  });
});

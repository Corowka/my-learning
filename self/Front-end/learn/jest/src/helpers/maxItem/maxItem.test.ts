import { maxItem } from "./maxItem";

describe("maxItem", () => {
  test("Equals", () => expect(maxItem([1, 1, 1])).toBe(1));
  test("Start with max", () => expect(maxItem([100, 1, 1])).toBe(100));
  test("End with max", () => expect(maxItem([1, 1, 100])).toBe(100));
  test("All different", () => expect(maxItem([100, -100, 0])).toBe(100));
  test("Infinity", () =>
    expect(maxItem([-Infinity, Infinity, 0])).toBe(Infinity));
});

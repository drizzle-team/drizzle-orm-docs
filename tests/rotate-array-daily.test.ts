import { afterEach, describe, expect, it, vi } from "vitest";
import { rotateArrayDaily } from "../src/rotate-array-daily";

afterEach(() => {
  vi.useRealTimers();
});

describe("rotateArrayDaily", () => {
  it("returns empty and single-item arrays unchanged", () => {
    const empty: string[] = [];
    const single = ["a"];

    expect(rotateArrayDaily(empty)).toBe(empty);
    expect(rotateArrayDaily(single)).toBe(single);
  });

  it.each([
    ["2025-01-01T00:00:00.000Z", ["a", "b", "c"]],
    ["2025-01-02T00:00:00.000Z", ["b", "c", "a"]],
    ["2025-01-03T00:00:00.000Z", ["c", "a", "b"]],
    ["2025-01-04T00:00:00.000Z", ["a", "b", "c"]],
  ])("rotates by elapsed UTC days on %s", (date, expected) => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(date));

    expect(rotateArrayDaily(["a", "b", "c"])).toEqual(expected);
  });

  it("keeps the same order throughout a UTC day and changes at UTC midnight", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-02T00:00:00.000Z"));
    const first = rotateArrayDaily(["a", "b", "c"]);

    vi.setSystemTime(new Date("2025-01-02T23:59:59.999Z"));
    expect(rotateArrayDaily(["a", "b", "c"])).toEqual(first);

    vi.setSystemTime(new Date("2025-01-03T00:00:00.000Z"));
    expect(rotateArrayDaily(["a", "b", "c"])).toEqual(["c", "a", "b"]);
  });

  it("returns a new array without changing the source or its items", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-02T12:00:00.000Z"));
    const first = { id: "a" };
    const second = { id: "b" };
    const third = { id: "c" };
    const source = [first, second, third];

    const result = rotateArrayDaily(source);

    expect(result).not.toBe(source);
    expect(source).toEqual([first, second, third]);
    expect(result[0]).toBe(second);
    expect(result[1]).toBe(third);
    expect(result[2]).toBe(first);
  });
});

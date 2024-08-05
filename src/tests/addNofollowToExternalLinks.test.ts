// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { describe, it, expect } from "vitest";
import addNofollowToExternalLinks from "../utils/addNofollowToExternalLinks";

describe("addNofollowToExternalLinks", () => {
  it('adds rel="nofollow" to external links', () => {
    const input =
      'Updated <a href="https://example.com/learn/tutorials/drizzle-with-vercel">Drizzle with Vercel Postgres</a> tutorial';
    const expected =
      'Updated <a href="https://example.com/learn/tutorials/drizzle-with-vercel" rel="nofollow">Drizzle with Vercel Postgres</a> tutorial';
    expect(addNofollowToExternalLinks(input)).toBe(expected);
  });

  it('does not modify links that already have rel="nofollow"', () => {
    const input =
      'Visit <a href="https://example.com" rel="nofollow">our site</a> for more info';
    const expected =
      'Visit <a href="https://example.com" rel="nofollow">our site</a> for more info';
    expect(addNofollowToExternalLinks(input)).toBe(expected);
  });

  it("does not modify internal links", () => {
    const input = 'Check out our <a href="/about">About page</a>';
    const expected = 'Check out our <a href="/about">About page</a>';
    expect(addNofollowToExternalLinks(input)).toBe(expected);
  });

  it('adds rel="nofollow" to multiple external links', () => {
    const input =
      'Visit <a href="https://example.com">Example</a> and <a href="https://another.com">Another</a>';
    const expected =
      'Visit <a href="https://example.com" rel="nofollow">Example</a> and <a href="https://another.com" rel="nofollow">Another</a>';
    expect(addNofollowToExternalLinks(input)).toBe(expected);
  });

  it("handles links with other attributes correctly", () => {
    const input =
      'Check <a href="https://example.com" class="external">this link</a>';
    const expected =
      'Check <a href="https://example.com" class="external" rel="nofollow">this link</a>';
    expect(addNofollowToExternalLinks(input)).toBe(expected);
  });
});

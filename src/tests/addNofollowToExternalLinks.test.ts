// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { describe, it, expect } from "vitest";
import addNofollowToExternalLinks from "../utils/addNofollowToExternalLinks";

describe("linkTransformer", () => {
  it('should add rel="nofollow" to external links', () => {
    const input = '<a href="https://example.com">Example</a>';
    const output = '<a href="https://example.com" rel="nofollow">Example</a>';
    expect(addNofollowToExternalLinks(input)).toBe(output);
  });

  it('should not add rel="nofollow" to internal links', () => {
    const input = '<a href="/internal">Internal</a>';
    const output = '<a href="/internal">Internal</a>';
    expect(addNofollowToExternalLinks(input)).toBe(output);
  });

  it('should not add rel="nofollow" to links with nofollow already present', () => {
    const input = '<a href="https://example.com" rel="nofollow">Example</a>';
    const output = '<a href="https://example.com" rel="nofollow">Example</a>';
    expect(addNofollowToExternalLinks(input)).toBe(output);
  });

  it('should not add rel="nofollow" to links on orm.drizzle.team', () => {
    const input = '<a href="https://orm.drizzle.team">Drizzle ORM</a>';
    const output = '<a href="https://orm.drizzle.team">Drizzle ORM</a>';
    expect(addNofollowToExternalLinks(input)).toBe(output);
  });

  it('should not add rel="nofollow" to links on drizzle.team', () => {
    const input = '<a href="https://drizzle.team">Drizzle Team</a>';
    const output = '<a href="https://drizzle.team">Drizzle Team</a>';
    expect(addNofollowToExternalLinks(input)).toBe(output);
  });

  it('should add rel="nofollow" to other external links', () => {
    const input = '<a href="https://otherdomain.com">Other Domain</a>';
    const output =
      '<a href="https://otherdomain.com" rel="nofollow">Other Domain</a>';
    expect(addNofollowToExternalLinks(input)).toBe(output);
  });

  it("should handle multiple links in one string", () => {
    const input = `
      <a href="https://example.com">Example</a> 
      <a href="https://orm.drizzle.team">Drizzle ORM</a> 
      <a href="https://otherdomain.com">Other Domain</a> 
      <a href="https://drizzle.team">Drizzle Team</a>
    `;
    const output = `
      <a href="https://example.com" rel="nofollow">Example</a> 
      <a href="https://orm.drizzle.team">Drizzle ORM</a> 
      <a href="https://otherdomain.com" rel="nofollow">Other Domain</a> 
      <a href="https://drizzle.team">Drizzle Team</a>
    `;
    expect(addNofollowToExternalLinks(input)).toBe(output);
  });

  it("should handle text content inside links", () => {
    const input = '<a href="https://example.com">Visit Example</a>';
    const output =
      '<a href="https://example.com" rel="nofollow">Visit Example</a>';
    expect(addNofollowToExternalLinks(input)).toBe(output);
  });

  it("should handle complex inner HTML in links", () => {
    const input =
      '<a href="https://example.com"><span>Visit Example</span></a>';
    const output =
      '<a href="https://example.com" rel="nofollow"><span>Visit Example</span></a>';
    expect(addNofollowToExternalLinks(input)).toBe(output);
  });
});

import { describe, expect, test } from "vitest";
import { resolveDocsDialectFromSlug } from "../src/dialect-docs";

describe("resolveDocsDialectFromSlug", () => {
  test("uses explicit dialect route prefixes", () => {
    expect(resolveDocsDialectFromSlug("docs/mysql/select")).toBe("mysql");
    expect(resolveDocsDialectFromSlug("docs/sqlite/select")).toBe("sqlite");
    expect(resolveDocsDialectFromSlug("docs/singlestore/select")).toBe(
      "singlestore",
    );
    expect(resolveDocsDialectFromSlug("docs/mssql/select")).toBe("mssql");
    expect(resolveDocsDialectFromSlug("docs/cockroach/select")).toBe(
      "cockroach",
    );
  });

  test("maps get started pages to their database dialect", () => {
    expect(resolveDocsDialectFromSlug("docs/get-started/mysql-new")).toBe(
      "mysql",
    );
    expect(resolveDocsDialectFromSlug("docs/get-started/planetscale-existing"))
      .toBe("mysql");
    expect(resolveDocsDialectFromSlug("docs/get-started/turso-new")).toBe(
      "sqlite",
    );
    expect(resolveDocsDialectFromSlug("docs/get-started/singlestore-new")).toBe(
      "singlestore",
    );
    expect(resolveDocsDialectFromSlug("docs/get-started/mssql-new")).toBe(
      "mssql",
    );
    expect(resolveDocsDialectFromSlug("docs/get-started/cockroach-new")).toBe(
      "cockroach",
    );
  });

  test("keeps postgres as the fallback context", () => {
    expect(resolveDocsDialectFromSlug("docs/get-started/postgresql-new")).toBe(
      "pg",
    );
    expect(resolveDocsDialectFromSlug("docs/get-started")).toBe("pg");
  });
});

# Upgrade an existing Drizzle project to v1

Migrate this existing Drizzle project from legacy 0.x or an earlier v1 beta
or RC to the current Drizzle v1 release candidate. Install `drizzle-orm@rc`
and `drizzle-kit@rc` using the `@rc` tags, without pinning a specific RC number.

Complete the v1 application upgrade: convert older migration files, adapt code
for the relevant v1 breaking changes, and verify the result locally. Updating
package versions alone does not complete the upgrade. The agent tooling setup
is one step in this application upgrade.

For projects already using a v1 beta or RC, identify which changes are still
needed from their installed versions. Preserve work already migrated to v1.
Carry out the file changes and local checks using your tools. Follow the user's
instructions and your client's permissions.

Do not apply database changes. Do not run `migrate`, `push`, `pull --init`,
or the application's migration or deployment scripts. Do not reset a database,
delete applied migrations, or regenerate them as a way to resolve conflicts.
Do not commit unless the user asks.

## Identify the upgrade target

Find the package that owns Drizzle, its package manager and lockfile. Read the
resolved ORM and Kit versions, existing config, migration files and application
migration workflow. In a monorepo, work in that package. If several packages
use Drizzle and the target is unclear, ask which one to upgrade.

Preserve unrelated work and existing config, including custom history table
and schema settings. The user should have a database backup. Before converting
files, preserve a recoverable copy of the existing migration history without
overwriting user changes. Do not request database credentials for local checks.

Read the guide for the project's dialect and follow its linked breaking changes
and Relational Queries migration guides:

- PostgreSQL: https://orm.drizzle.team/docs/upgrade-v1
- MySQL: https://orm.drizzle.team/docs/mysql/upgrade-v1
- SQLite: https://orm.drizzle.team/docs/sqlite/upgrade-v1

For other dialects, inspect their current documentation and installed Kit's
supported commands. Do not assume another dialect's snapshot conversion applies.

## Update packages before setting up agent tooling

Before installing, resolve both `@rc` tags with the project's package manager.
This URL is specifically for upgrading to v1. Both tags must resolve to
`1.0.0-rc.*` releases. If either tag targets another version series, stop and
explain that these instructions need updating. Do not upgrade to a later major
or silently choose another tag or version.

Update ORM and Kit together using the project's package manager and `@rc` tags.
Keep `drizzle-orm` as a runtime dependency and `drizzle-kit` as a development
dependency. Do not install untagged `latest` or a global Kit. Check resolved
versions and Kit's ORM peer dependency after installing.

Only after both packages are compatible rc releases, fetch and follow:
https://orm.drizzle.team/agent-setup/prompt.md

Those instructions install or refresh the bundled Drizzle skill, configure
MCP for the current client and verify activation. They deliberately stop on
legacy or beta packages, which is why the package upgrade comes first.
Follow their rules for custom skills and existing agent configuration.

Load the updated Drizzle skill before continuing. If a new session or client
approval is required, report what is pending and give the user the exact action
and where to resume. Do not claim the skill or MCP is active without verification.
If the client cannot use MCP, continue with the installed skill and local CLI
where supported, and report that limitation. Do not duplicate the setup
instructions or invent client configuration.

## Convert the local migration history

Use the project's installed Kit and existing config to run `drizzle-kit up`.
Use the CLI or MCP's available upgrade tool. Repeat for each migration folder
in scope. This updates local files without applying changes to the database.

The v3 layout replaces flat SQL files and `meta/_journal.json` with one folder
per migration, containing `migration.sql` and `snapshot.json`. Folder names use
the old journal's UTC timestamp and migration name. Preserve SQL contents.
Snapshots move to a DDL-based format. PostgreSQL format 9 stores a complete
initial snapshot and subsequent diffs, so preserve the entire snapshot chain.
Projects already using v3 folders may only need snapshot conversion.

The shared journal is removed to avoid Git conflicts in that file.
`drizzle-kit drop` has been removed. Background:
https://github.com/drizzle-team/drizzle-orm/discussions/2832

If conversion reports missing SQL, snapshots, invalid ordering or unsupported
history, stop and explain the error. Restore missing files from version control
when their provenance is clear. Do not remove or rewrite applied migrations,
replace the history with an initial migration, or automatically repair conflicts
by deleting migration branches. Such repairs can require a database reset.

## Adapt application code and check the result

Follow the dialect's breaking changes and the installed skill. Update affected
code and imports. For Relational Queries, follow the linked v1-to-v2 guides for
both relation definitions and queries. Do not change application behavior or
schema beyond what the upgrade requires.

Run `drizzle-kit check` with the same config and the project's relevant type
checks and tests. Inspect test scripts before running them so local validation
does not accidentally apply migrations to an existing database. Report checks
that need a separate database instead of running them against an unknown target.

Review the file diff. Every previous migration must retain its SQL in the
converted folder. Keep the snapshots and their full parent chain. Stop on
missing history or conflicts. Commutativity checks detect incompatible changes
across branches, such as renaming a table that another branch alters:
https://github.com/drizzle-team/drizzle-orm/discussions/5005

## Explain the next migration run

Stop before running migrations. Explain how the project's existing migration
command will behave with the new packages and converted files:

- If the database history table still uses the old format, the migrator adds
  `name` and `applied_at` and matches existing rows to local migration folders.
- Previously applied migrations are marked as applied in the updated history.
  Their SQL is not executed a second time. `applied_at` remains `NULL` for older
  migrations because their execution date was not recorded.
- Every local migration whose full folder name is absent from the database
  history is applied, even if its timestamp predates the latest applied one.
  Keep converted folder names stable after upgrading.
- If an old database history row cannot be matched to a local migration,
  the history upgrade fails. Restore the missing migration rather than deleting
  database history. If a prior beta or RC already upgraded the history table,
  that backfill is not repeated.

Report resolved package versions, application changes, history conversion,
skill/MCP status, checks and unresolved issues. Give the project's existing
migration command for the user to run. Identify pending migrations only when
supported by available evidence. If you have not inspected the database's
applied history, say which parts remain unverified. Do not claim the database
upgrade succeeded based on local checks.

Canonical prompt: https://orm.drizzle.team/agent-upgrade/v1/prompt.md

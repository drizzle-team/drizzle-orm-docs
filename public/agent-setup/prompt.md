# Set up your coding agent for Drizzle

Set up the current coding agent to work with Drizzle in this project. This
setup targets `drizzle-orm@rc` and `drizzle-kit@rc` only. Install the Drizzle
skill and connect the Drizzle Kit MCP server when the client supports it.

Carry out the setup using your tools. Ask the user only for a missing project
decision or permission your client requires. Finish with the verification
results and any activation step the user needs to perform.

This is agent tooling setup. Do not create or change the application's schema,
Drizzle config, migration files, database connection, or database contents.
Follow the user's instructions and your client's permissions throughout.

## Install rc prerequisites

Find the package that owns the Drizzle schema and config. Read its
`package.json`, the workspace configuration, and the package manager's lockfile.
In a monorepo, work from that package rather than installing at the repository
root. If several packages use Drizzle and the intended package is unclear, ask
which one to set up. If there is no `package.json`, ask where to set up Drizzle
before creating a project.

Identify the current agent and any existing skills or MCP configuration. Keep
unrelated entries and instructions. Do not install other agents, change their
permission settings, or write to user-level configuration without permission.

Check the resolved, installed versions of `drizzle-orm` and `drizzle-kit`, not
only the version ranges in `package.json`. Restore missing dependencies with
the existing lockfile before deciding whether a declared package is absent.

- If both packages are installed as compatible `1.0.0-rc.*` releases, keep
  their versions. Check the installed Kit's help for `skills` and `mcp`.
- If either installed package is a legacy `0.x`, beta, or another release
  outside the rc series, explain that this setup requires rc and stop before
  changing dependencies. Upgrading an existing application is a separate task.
- If an rc package is missing, install only the missing package using the
  project's package manager and the `@rc` tag. Add `drizzle-orm` as a runtime
  dependency and `drizzle-kit` as a development dependency. Check Kit's ORM
  peer dependency before installing so the versions remain compatible. If that
  would require changing an existing rc version, explain the required update
  and ask before proceeding.

For example, in an npm project with neither package installed:

```sh
npm install drizzle-orm@rc
npm install --save-dev drizzle-kit@rc
```

Use the equivalent `add` commands for pnpm, Yarn, or Bun. Do not install Drizzle
globally or use the untagged `latest` packages. After installation, check the
resolved versions again. If the installed Kit lacks `skills` or `mcp`, report
which command is unavailable and the rc update needed to continue.

## Install the bundled Drizzle skill

Run the project's installed Drizzle Kit from the package identified above:

| Package manager | Command                               |
| --------------- | ------------------------------------- |
| npm             | `npx --no-install drizzle-kit skills` |
| pnpm            | `pnpm exec drizzle-kit skills`        |
| Yarn            | `yarn drizzle-kit skills`             |
| Bun             | `bun run drizzle-kit skills`          |

This command runs the external `skills` installer, which needs network access,
but the Drizzle skill comes from the installed Kit package. Select the current
agent and project scope if prompted. The installer may detect your agent and
install without prompting. Keep a matching existing installation when possible.
If the installer needs terminal interaction you cannot provide, give the user
the exact command and selections, then report this step as pending.

Before installing, inspect existing Drizzle skills for custom edits. Kit removes
the older project skills named `drizzle-generate`, `drizzle-push`, `drizzle-pull`,
`drizzle-migrations`, `drizzle-hints`, `drizzle-output-modes`, and
`drizzle-responses-and-errors` after installation. Ask before replacing custom
instructions or removing customized copies of those skills.

Verify that the installed `drizzle` skill is discoverable by the current agent
and that its relative topic links resolve. Load it if the current session can
discover newly installed skills. Otherwise, tell the user to start a new session
and report that loading the skill has not yet been verified.

## Configure MCP for your agent

Use the current client's supported project configuration. Follow its official
setup instructions and the [Drizzle MCP guide](https://orm.drizzle.team/docs/drizzle-kit-mcp).
Merge the Drizzle entry into existing configuration. Reuse a correct existing
entry. Ask before replacing a conflicting Drizzle entry.

Launch the installed Kit using the command for the project's package manager:

| Package manager | Command | Arguments                      |
| --------------- | ------- | ------------------------------ |
| npm             | `npx`   | `--no-install drizzle-kit mcp` |
| pnpm            | `pnpm`  | `exec drizzle-kit mcp`         |
| Yarn            | `yarn`  | `drizzle-kit mcp`              |
| Bun             | `bun`   | `run drizzle-kit mcp`          |

Set the server's working directory to the package that owns Drizzle. Config
lookup and relative paths resolve from the server's working directory. In a
monorepo, verify that the client actually launches it there. If the client
cannot set a working directory directly, use its documented method of running
the package manager in that directory.

Do not launch a downloaded copy of Kit with `npx -y`, `pnpm dlx`, or `bunx`.
The server must resolve the project's own `drizzle-orm` and `drizzle-kit`.
If project configuration is unsupported or the client cannot run local stdio
servers, explain the limitation. Keep the skill usable with the CLI. Ask before
adding a user-level MCP entry.

The examples below use npm. For another package manager, replace `command` and
`args` using the table above.

### Codex

Add this entry to the project's `.codex/config.toml`. Replace the example `cwd`
with the absolute path of the package that owns Drizzle:

```toml
[mcp_servers.drizzle]
command = "npx"
args = ["--no-install", "drizzle-kit", "mcp"]
cwd = "/absolute/path/to/your/drizzle-package"
```

Use project configuration instead of `codex mcp add`, which writes to user
configuration. Codex loads project configuration only for trusted projects.
If it has not been loaded, tell the user to open the project, complete Codex's
trust prompt if they agree, and start a new session. Do not change trust or
approval settings yourself. See [Codex MCP configuration](https://learn.chatgpt.com/docs/extend/mcp).

### Claude Code

Run this command from the package that owns Drizzle:

```sh
claude mcp add --transport stdio --scope project drizzle -- npx --no-install drizzle-kit mcp
```

This adds the server to that project's `.mcp.json`. Open Claude Code from that
package directory. Tell the user to approve the project server when prompted
and use `/mcp` to check the connection.

### Cursor

Merge this entry into `.cursor/mcp.json` in the package that owns Drizzle:

```json
{
  "mcpServers": {
    "drizzle": {
      "command": "npx",
      "args": ["--no-install", "drizzle-kit", "mcp"]
    }
  }
}
```

Open that package as the Cursor project so the server starts in the correct
directory. If it is already open, reload the MCP configuration using the
client's supported controls.

### Grok CLI

Confirm that the bundled skill was installed to `.grok/skills/drizzle/` in the
target package. Do not assume another agent's installation is visible to Grok.

Run these commands from the package that owns Drizzle:

```sh
grok mcp add --scope project drizzle -- npx --no-install drizzle-kit mcp
grok mcp doctor drizzle
```

The first command adds the server to `.grok/config.toml` in the current
directory. The second checks its configuration and connection. Open Grok from
that package directory. If the project needs trust approval before its MCP
configuration loads, leave that decision to the user.

### OpenCode

Confirm that the bundled skill is available in `.opencode/skills/drizzle/` or
the project's shared `.agents/skills/drizzle/` directory.

Run these commands from the package that owns Drizzle:

```sh
opencode mcp add drizzle -- npx --no-install drizzle-kit mcp
opencode mcp list
```

The add command uses project scope by default. Do not add `--global`. OpenCode
v2 stores servers under `mcp.servers` in `opencode.json` or `opencode.jsonc`:

```json
{
  "mcp": {
    "servers": {
      "drizzle": {
        "type": "local",
        "command": ["npx", "--no-install", "drizzle-kit", "mcp"],
        "cwd": "/absolute/path/to/your/drizzle-package"
      }
    }
  }
}
```

Replace `cwd` with the target package's absolute path. For another package
manager, replace the complete `command` array using the command and arguments
table above. Check `opencode --version` and `opencode mcp add --help` before
editing configuration. If the installed client uses a different format, follow
the documentation for that version instead of rewriting its existing entries
into the v2 format. Start OpenCode in the target package and check the server
status with `opencode mcp list`.

For other clients, use their official stdio configuration instructions and
the package-manager command above. Do not reuse another client's JSON format
without checking it.

## Verify setup

Check the installed Kit version and `skills version` through the project's
package manager. Connect to the MCP server and list its tools. Do not call a
migration tool just to test the connection. Listing tools does not need a
Drizzle config or database credentials, so do not request secrets for setup.

A saved MCP entry alone does not prove the server is connected. If the client
needs a restart or approval before loading it, report that verification as
pending and give the exact next action. Stop any temporary server you started
for verification.

Summarize the resolved package versions, target package, installed skill,
configuration files changed, and checks that passed. Separate completed steps
from anything still waiting on user interaction. Do not claim setup is complete
until the skill is available and the MCP connection is verified, or explain
that this client is using the skill with the CLI instead.

Suggest this first task once setup is ready:

```text
Use the drizzle skill to inspect my Drizzle schema and config. Explain the
migration workflow this project uses. Do not change files or the database.
```

## Resources

- [Drizzle agent skills](https://orm.drizzle.team/docs/drizzle-kit-skills)
- [Drizzle Kit MCP server](https://orm.drizzle.team/docs/drizzle-kit-mcp)
- [Claude Code MCP configuration](https://code.claude.com/docs/en/mcp)
- [Codex MCP configuration](https://learn.chatgpt.com/docs/extend/mcp)
- [Cursor MCP configuration](https://cursor.com/docs/mcp)
- [Grok MCP configuration](https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-pager/docs/user-guide/07-mcp-servers.md)
- [OpenCode MCP configuration](https://opencode.ai/docs/mcp-servers/)

Canonical prompt: https://orm.drizzle.team/agent-setup/prompt.md

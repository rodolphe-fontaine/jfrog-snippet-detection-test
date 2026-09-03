# JFrog Snippet Detection Benchmark

Small but realistic **multi-package API** used to benchmark [JFrog Snippet Detection](https://docs.jfrog.com/security/docs/snippet-detection): function-level semantic fingerprinting against the **JFrog Catalog**, with CLI output showing **license violations** and an **SBOM enriched with snippet matches**.
 
 gnnnananan 


This is **not** production code.

## What Snippet Detection targets

| Aspect | This repo |
|--------|-----------|
| Code types | Web/repo copies, vendored OSS, AI-style rewrites |
| Granularity | Functions (not just text diff) |
| Method | Semantic fingerprint (logic / control flow) |
| Catalog | Compared to public OSS in JFrog Catalog |
| Expected fields | Source repo, license, CVEs, confidence score |
| CLI output | License table + SBOM rows with `TYPE=snippet` |

## Repository layout

```
src/                    # First-party Express API (negative controls + app noise)
  server.js
  routes/ services/ middleware/ lib/
  legacy/imported-utils.js   # imports vendored snippets like real tech debt
snippets/               # Intentional OSS fixtures by tier
  exact/                # Verbatim copies (JS, Java, C — MIT/LGPL/GPL/AGPL)
  refactored/           # Renamed but same logic (lodash, Guava)
  partial/              # Excerpts (CPython, GNU Classpath)
  ai-style/             # Rewritten backoff (Go)
  pr-incoming/          # Target path for PR scenario templates
pom.xml                 # Java/Maven facet (commons-lang3 declared)
benchmark/
  expected-findings.yaml   # Ground truth for scoring runs
  pr-scenarios/            # Templates + playbook for incremental PR tests
```

**Declared dependencies** (`lodash`, `express` in `package.json`; `commons-lang3` in `pom.xml`) exercise **package-level SCA** separately from inline snippets.

## CI workflows

This repo uses [Frogbot V3](https://docs.jfrog.com/security/docs/github) (`version: latest`) and the JFrog CLI (`version: latest` via `setup-jfrog-cli@v4`) for snippet audits.

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `frogbot-scan.yml` | Push to `main`, PR, manual | Unified Frogbot scan (repository or pull request) |
| `snippet-audit.yml` | Push/PR/manual | `jf audit --snippet` (latest JFrog CLI) |
| `benchmark-pr-audit.yml` | PR touching `snippets/pr-incoming/**` | Targeted snippet audit for PR benchmark scenarios |

### GitHub prerequisites

**Secrets** (`Settings > Secrets and variables > Actions`):

| Secret | Value |
|--------|-------|
| `JF_URL` | Your JFrog Platform URL |
| `JF_ACCESS_TOKEN` | JFrog access token (scan scope; PR creation if auto-fix is enabled) |

**Variables** (`Settings > Secrets and variables > Actions > Variables`):

| Variable | Value | Required |
|----------|-------|----------|
| `JF_URL` | JFrog Platform URL (optional if set as secret only) | No |
| `JF_SNIPPET_WATCHES` | Override watch for `jf audit` (default: `minimum-to-respect`) | No |
| `JF_PROJECT` | JFrog project key for `jf audit` (instead of watch) | No |

`GITHUB_TOKEN` is provided automatically by Actions — no separate `JF_GIT_TOKEN` secret is required.

**Workflow permissions** (`Settings > Actions > General`):

- Select **Read and write permissions**
- Enable **Allow GitHub Actions to create and approve pull requests**

**Public vs private repository**

- **Private repo**: Frogbot runs with the secrets above; no extra setup.
- **Public repo** (PRs from forks): create a GitHub Environment named `frogbot` with at least one reviewer if you need gated secret access for fork PRs.

### JFrog Platform prerequisites

Frogbot and `jf audit --snippet` both rely on platform configuration:

1. **Administration > Xray > Indexed Resources > Git Repositories** — index this repository.
2. Enable **SCA** and **Snippet Detection** on the Git Repository resource.
3. Attach the Xray watch **`minimum-to-respect`** to this Git Repository (required for CVE/license violations in Frogbot and `jf audit`).

CLI and CI audits use `--watches=minimum-to-respect` by default (override with `JF_SNIPPET_WATCHES` or the `JF_SNIPPET_WATCHES` repository variable).

Frogbot workflows set `JF_USE_CONFIG_PROFILE=true` so scans use the Git Repository profile defined in the JFrog Platform UI (not a local `frogbot-config.yml`).

Because this repository name contains `test`, Frogbot's default path exclusion `*test*` would skip the entire tree. The workflow overrides `JF_PATH_EXCLUSIONS` with narrower test-file patterns and sets `JF_WATCHES=minimum-to-respect`.
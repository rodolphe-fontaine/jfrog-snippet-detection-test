# JFrog Snippet Detection Benchmark

Small but realistic **multi-package API** used to benchmark [JFrog Snippet Detection](https://docs.jfrog.com/security/docs/snippet-detection): function-level semantic fingerprinting against the **JFrog Catalog**, with CLI output showing **license violations** and an **SBOM enriched with snippet matches**.

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

## Run locally (JFrog CLI)

Prerequisites ([docs](https://docs.jfrog.com/security/docs/run-snippet-detection)):

- JFrog Unified Security entitlement + Catalog on your JPD
- JFrog CLI **≥ 2.95**
- Snippet Detection enabled for this Git repo (platform UI) or sufficient CLI flags

```bash
jf c add my-jpd --url=https://<tenant>.jfrog.io --access-token=<token>
jf c use my-jpd

npm install
npm test
npm start   # optional smoke: http://localhost:3000/health

# License policy evaluation (set your watch or project)
export JF_SNIPPET_WATCHES=license-watch
# or: export JF_PROJECT=my-project

npm run audit:snippet
# equivalent: jf audit --sca --sbom --static-sca --snippet --watches=license-watch
```

### Expected CLI shape

After a successful scan you should see:

1. **License Compliance Violations** — e.g. `GPL-2.0-or-later` / `LGPL` from `ffmpeg/ffmpeg` snippet rows
2. **Software Bill of Materials** — components such as `ffmpeg/ffmpeg` with `VERSION=snippet`, `TYPE=Github`

Compare output to `benchmark/expected-findings.yaml`.

## CI

| Workflow | Purpose |
|----------|---------|
| `.github/workflows/frogbot.yml` | **Frogbot v3** PR scans (`JF_USE_CONFIG_PROFILE=true`) |
| `.github/workflows/snippet-audit.yml` | **`jf audit --snippet`** on push/PR/manual |
| `.github/workflows/benchmark-pr-audit.yml` | Snippet audit when `snippets/pr-incoming/**` changes |

### PR benchmark scenarios

Copy a template from `benchmark/pr-scenarios/` into the path shown in `benchmark/pr-scenarios/README.md`, open a PR, and compare Frogbot + CLI output to the `pr_scenarios` section in `expected-findings.yaml`.

**Platform setup (required for Frogbot snippet scans):**

1. Administration → Xray Settings → Indexed Resources → **Git Repositories**
2. Select this repo → **Configure** → enable **Snippet Detection**
3. Add an Xray **watch** for license policies; set GitHub variable `JF_SNIPPET_WATCHES` for the audit workflow

Secrets: `JF_URL`, `JF_ACCESS_TOKEN`.

## Scoring a benchmark run

1. Run `npm run audit:snippet` or open a PR (Frogbot).
2. For each row in `benchmark/expected-findings.yaml`, check Xray **Scans List** and CLI SBOM.
3. Record per tier: `exact` (must match), `refactored` / `partial` (should match), `ai_style` (stretch), `negative_control` (must not appear as snippet).

Scan results in the platform are retained **7 days** — export CLI output or scan reports for long-term benchmarks.

## References

- [Snippet Detection overview](https://docs.jfrog.com/security/docs/snippet-detection)
- [How to Run Snippet Detection](https://docs.jfrog.com/security/docs/run-snippet-detection)
- [Frogbot V3](https://docs.jfrog.com/security/docs/frogbot-v3)

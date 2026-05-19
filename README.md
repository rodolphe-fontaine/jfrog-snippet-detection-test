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
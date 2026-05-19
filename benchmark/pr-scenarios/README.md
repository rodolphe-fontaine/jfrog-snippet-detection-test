# PR scenarios for Frogbot / snippet benchmark

Use these scenarios to validate **incremental** snippet detection on pull requests (Frogbot v3 + platform Snippet Detection enabled).

## How to run a scenario

1. Create a branch: `git checkout -b benchmark/scenario-<id>`
2. Copy the template from the scenario folder into the path indicated (or apply the diff described).
3. Open a PR against `main`.
4. Compare Frogbot PR comment + Xray Scans List with `../expected-findings.yaml`.
5. Record results in your benchmark log (export CLI output — platform retention is 7 days).

## Scenarios

| ID | Folder | What the PR adds | Expected signal |
|----|--------|------------------|-----------------|
| `S1` | `01-add-gpl-c-snippet/` | New GPL C function (coreutils-style) | License violation GPL-3.0+, SBOM snippet row |
| `S2` | `02-add-java-commons-excerpt/` | New Apache Commons Java excerpt | MIT snippet match, low policy risk |
| `S3` | `03-add-ai-style-go/` | Go retry helper (rewritten) | Uncertain semantic match |
| `S4` | `04-negative-first-party/` | New first-party util only | No new snippet components |

## Baseline vs delta

- **Baseline**: scan `main` (all fixtures already in tree).
- **Delta**: each scenario PR should add **only** the template file(s) so you can attribute new findings to that PR.

Templates are **not** scanned until copied into `snippets/` or `src/` — they live under `benchmark/pr-scenarios/*/`.

# Snippet fixtures

Intentional OSS copies for benchmarking [JFrog Snippet Detection](https://docs.jfrog.com/security/docs/snippet-detection).

| Tier | Path | Origin | License risk |
|------|------|--------|--------------|
| **exact** | `exact/lodash-debounce.cjs` | lodash/lodash | MIT (low) |
| **exact** | `exact/ffmpeg-avstring.c` | ffmpeg/ffmpeg | LGPL (high) |
| **exact** | `exact/commons-lang-strip.java` | apache/commons-lang | Apache-2.0 (low) |
| **exact** | `exact/gpl-coreutils-basename.c` | coreutils/coreutils | GPL-3.0+ (high) |
| **exact** | `exact/agpl-ghostscript-path.c` | ArtifexSoftware/ghostpdl | AGPL-3.0 (critical) |
| **refactored** | `refactored/deep-merge.js` | lodash merge | MIT |
| **refactored** | `refactored/guava-preconditions.java` | google/guava | Apache-2.0 |
| **partial** | `partial/urllib-parse.py` | python/cpython | PSF |
| **partial** | `partial/gpl-classpath-uri.java` | classpath/classpath | GPL-2.0+ |
| **ai-style** | `ai-style/http-retry.go` | common Go backoff | MIT (uncertain) |
| **pr-incoming/** | (empty until PR scenario) | see `benchmark/pr-scenarios/` | varies |

Ground truth: `benchmark/expected-findings.yaml`  
PR playbook: `benchmark/pr-scenarios/README.md`

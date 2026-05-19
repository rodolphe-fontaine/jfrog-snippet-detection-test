/**
 * Legacy module path — mirrors how copied OSS code often lands in real repos
 * (vendored under src/legacy or vendor/ without going through package.json).
 */
import debounce from "../../snippets/exact/lodash-debounce.cjs";
import { deepMergeRefactored } from "../../snippets/refactored/deep-merge.js";

export { debounce, deepMergeRefactored };

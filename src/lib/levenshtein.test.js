import test from "node:test";
import assert from "node:assert/strict";
import { levenshteinDistance } from "./levenshtein.js";

test("levenshtein distance", () => {
  assert.equal(levenshteinDistance("kitten", "sitting"), 3);
});

import test from "node:test";
import assert from "node:assert/strict";
import { debounce } from "./debounce.js";

test("debounce invokes after wait", async () => {
  let calls = 0;
  const fn = debounce(() => {
    calls += 1;
  }, 20);
  fn();
  fn();
  await new Promise((r) => setTimeout(r, 40));
  assert.equal(calls, 1);
});

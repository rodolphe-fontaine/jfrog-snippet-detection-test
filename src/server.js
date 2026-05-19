import express from "express";
import searchRouter from "./routes/search.js";
import { createRateLimiter } from "./middleware/rateLimit.js";
import { debounce, deepMergeRefactored } from "./legacy/imported-utils.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(createRateLimiter());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "snippet-benchmark-api" });
});

app.use("/api/search", searchRouter);

// Touch legacy imports so static analysis sees the dependency graph.
const _legacyDebounce = debounce(() => {}, 50);
const _legacyMerge = deepMergeRefactored({ a: 1 }, { b: 2 });
void _legacyDebounce;
void _legacyMerge;

app.listen(port, () => {
  console.log(`snippet-benchmark-api listening on :${port}`);
});

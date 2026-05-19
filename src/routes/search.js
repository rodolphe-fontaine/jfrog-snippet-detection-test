import { Router } from "express";
import { rankBySimilarity } from "../services/textMetrics.js";
import { mergeDeep } from "../lib/merge.js";

const router = Router();

const CORPUS = [
  "payment webhook retry",
  "user profile export",
  "snippet detection benchmark",
  "license compliance report",
];

router.get("/", (req, res) => {
  const query = String(req.query.q || "");
  const results = rankBySimilarity(query, CORPUS);
  res.json({ query, results });
});

router.post("/config", (req, res) => {
  const defaults = { features: { search: true, audit: false } };
  const merged = mergeDeep(defaults, req.body || {});
  res.json(merged);
});

export default router;

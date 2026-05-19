import { levenshteinDistance } from "../lib/levenshtein.js";

export function similarityScore(a, b) {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  const distance = levenshteinDistance(a, b);
  return 1 - distance / maxLen;
}

export function rankBySimilarity(query, candidates) {
  return candidates
    .map((text) => ({ text, score: similarityScore(query, text) }))
    .sort((a, b) => b.score - a.score);
}

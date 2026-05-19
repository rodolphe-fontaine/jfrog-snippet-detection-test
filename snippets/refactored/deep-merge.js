/**
 * REFACTORED — semantically similar to lodash _.merge (MIT)
 * Source: https://github.com/lodash/lodash — merge.js
 * Variables renamed, structure flattened; control flow preserved.
 */
function isPlainRecord(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

export function deepMergeRefactored(base, patch) {
  if (!isPlainRecord(base) || !isPlainRecord(patch)) {
    return patch === undefined ? base : patch;
  }

  const output = { ...base };

  for (const key of Object.keys(patch)) {
    const patchValue = patch[key];
    const baseValue = base[key];

    if (isPlainRecord(patchValue) && isPlainRecord(baseValue)) {
      output[key] = deepMergeRefactored(baseValue, patchValue);
    } else {
      output[key] = patchValue;
    }
  }

  return output;
}

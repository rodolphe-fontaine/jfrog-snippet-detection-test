/**
 * First-party debounce — same behavior as common OSS patterns but rewritten
 * (semantic-match negative control vs snippets/exact/lodash-debounce.js).
 */
export function debounce(fn, wait, immediate = false) {
  let timeout;

  return function debounced(...args) {
    const context = this;

    const later = function () {
      timeout = null;
      if (!immediate) {
        fn.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      fn.apply(context, args);
    }
  };
}

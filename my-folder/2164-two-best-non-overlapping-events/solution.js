/**
 * @param {number[][]} events
 * @return {number}
 */
var maxTwoEvents = function(events) {
  // Sort by start time
  events.sort((a, b) => a[0] - b[0]);
  const n = events.length;

  // starts[i] = events[i][0]
  const starts = new Array(n);
  // suffixBest[i] = max value of a single event among events[i..n-1]
  const suffixBest = new Array(n + 1).fill(0);

  for (let i = 0; i < n; i++) starts[i] = events[i][0];
  for (let i = n - 1; i >= 0; i--) {
    suffixBest[i] = Math.max(suffixBest[i + 1], events[i][2]);
  }

  const lowerBound = (arr, x) => {
    let lo = 0, hi = arr.length; // [lo, hi)
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };

  let ans = 0;

  for (let i = 0; i < n; i++) {
    const [s, e, v] = events[i];
    // Next event must start >= e + 1 (inclusive endpoints)
    const j = lowerBound(starts, e + 1);
    ans = Math.max(ans, v + suffixBest[j]); // take event i + best non-overlapping after it
    ans = Math.max(ans, v);                 // or take only event i
  }

  return ans;
};

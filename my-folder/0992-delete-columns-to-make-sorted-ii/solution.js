/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function(strs) {
  const n = strs.length;
  const m = strs[0].length;

  // sorted[i] = true means pair (i, i+1) is already strictly sorted
  const sorted = new Array(n - 1).fill(false);

  let deletions = 0;

  for (let col = 0; col < m; col++) {
    // Check if keeping this column would break lexicographic order
    let mustDelete = false;
    for (let i = 0; i < n - 1; i++) {
      if (sorted[i]) continue; // already decided by earlier columns
      if (strs[i][col] > strs[i + 1][col]) {
        mustDelete = true;
        break;
      }
    }

    if (mustDelete) {
      deletions++;
      continue;
    }

    // Keep this column, update sorted pairs
    for (let i = 0; i < n - 1; i++) {
      if (sorted[i]) continue;
      if (strs[i][col] < strs[i + 1][col]) {
        sorted[i] = true;
      }
    }
  }

  return deletions;
};

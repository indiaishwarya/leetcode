/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function(strs) {
  const n = strs.length;
  const m = strs[0].length;

  // dp[j] = length of longest valid column subsequence ending at column j
  const dp = new Array(m).fill(1);

  const canFollow = (i, j) => {
    for (let r = 0; r < n; r++) {
      if (strs[r][i] > strs[r][j]) return false;
    }
    return true;
  };

  let best = 1;

  for (let j = 0; j < m; j++) {
    for (let i = 0; i < j; i++) {
      if (canFollow(i, j)) {
        dp[j] = Math.max(dp[j], dp[i] + 1);
      }
    }
    best = Math.max(best, dp[j]);
  }

  return m - best; 
};

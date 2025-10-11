/**
 * @param {number[]} power
 * @return {number}
 */
var maximumTotalDamage = function(power) {
  // 1) group by damage value
  const map = new Map();
  for (const x of power) map.set(x, (map.get(x) || 0) + 1);

  // 2) unique sorted damages and their total contribution
  const vals = Array.from(map.keys()).sort((a, b) => a - b);
  const w = vals.map(v => v * map.get(v));  // sum[v] = v * count

  const k = vals.length;
  if (k === 0) return 0;

  // 3) DP with two-pointer to find last compatible index j
  const dp = new Array(k).fill(0);
  let j = -1; // last index with vals[i] - vals[j] > 2

  for (let i = 0; i < k; i++) {
    // move j forward as long as gap > 2
    while (j + 1 < i && vals[i] - vals[j + 1] > 2) j++;

    const take = w[i] + (j >= 0 ? dp[j] : 0);
    const skip = i > 0 ? dp[i - 1] : 0;
    dp[i] = Math.max(skip, take);
  }

  return dp[k - 1];
};


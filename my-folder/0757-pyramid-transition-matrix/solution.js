/**
 * @param {string} bottom
 * @param {string[]} allowed
 * @return {boolean}
 */
var pyramidTransition = function(bottom, allowed) {
  // Map "AB" -> array of possible tops, e.g. ["C","D"]
  const map = new Map();
  for (const rule of allowed) {
    const key = rule.slice(0, 2);
    const top = rule[2];
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(top);
  }

  const memo = new Map(); // memo[row] = true/false

  const canBuild = (row) => {
    if (row.length === 1) return true;
    if (memo.has(row)) return memo.get(row);

    // If any adjacent pair has no rule, impossible
    for (let i = 0; i < row.length - 1; i++) {
      if (!map.has(row[i] + row[i + 1])) {
        memo.set(row, false);
        return false;
      }
    }

    // Backtrack to generate next row
    const next = new Array(row.length - 1);

    const dfsNext = (idx) => {
      if (idx === row.length - 1) {
        return canBuild(next.join(''));
      }
      const key = row[idx] + row[idx + 1];
      const tops = map.get(key);
      for (const ch of tops) {
        next[idx] = ch;
        if (dfsNext(idx + 1)) return true;
      }
      return false;
    };

    const ans = dfsNext(0);
    memo.set(row, ans);
    return ans;
  };

  return canBuild(bottom);
};


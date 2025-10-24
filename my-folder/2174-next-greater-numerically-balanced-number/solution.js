/**
 * @param {number} n
 * @return {number}
 */
var nextBeautifulNumber = function(n) {
  const nStr = String(n);
  const lenN = nStr.length;

  // Build all subsets of {1..9} whose sum equals target length L.
  const subsetCountsForLen = (L) => {
    const res = [];
    for (let mask = 1; mask < (1 << 9); mask++) {
      let sum = 0;
      const cnt = Array(10).fill(0); // cnt[d] occurrences of digit d
      for (let d = 1; d <= 9; d++) {
        if (mask & (1 << (d - 1))) {
          sum += d;
          cnt[d] = d;
        }
      }
      if (sum === L) res.push(cnt);
    }
    return res;
  };

  // Compare prefix-aware: try to build the smallest string strictly greater than target,
  // using available counts cnt[0..9] (only 1..9 used), in lexicographic order.
  const smallestStrictlyGreater = (target, cnt) => {
    const L = target.length;
    const tmp = new Array(L);

    // cmp flag: 0 = equal so far, 1 = already greater. We never allow -1 (less) branches.
    const dfs = (i, cmp) => {
      if (i === L) return cmp === 1 ? tmp.join('') : null;

      const tDigit = target.charCodeAt(i) - 48; // target digit at i
      for (let d = 1; d <= 9; d++) {
        if (cnt[d] === 0) continue;

        if (cmp === 0) {
          if (d < tDigit) continue;                 // would make prefix smaller -> prune
          const newCmp = d > tDigit ? 1 : 0;
          cnt[d]--;
          tmp[i] = String(d);
          const out = dfs(i + 1, newCmp);
          cnt[d]++;
          if (out !== null) return out;             // first lexicographic success
        } else {
          // already greater: just pick smallest available digit
          cnt[d]--;
          tmp[i] = String(d);
          const out = dfs(i + 1, 1);
          cnt[d]++;
          if (out !== null) return out;
          // no need to try larger d if a smaller failed? We must try all to fill; keep loop.
        }
      }
      return null;
    };

    return dfs(0, 0);
  };

  // Construct the minimal number (ascending digits) from cnt[]
  const buildAscending = (cnt) => {
    let s = '';
    for (let d = 1; d <= 9; d++) {
      if (cnt[d] > 0) s += String(d).repeat(cnt[d]);
    }
    return s;
  };

  // Try same length first
  let best = null;
  for (const cnt of subsetCountsForLen(lenN)) {
    const candStr = smallestStrictlyGreater(nStr, cnt.slice());
    if (candStr !== null) {
      if (best === null || candStr.length < best.length || (candStr.length === best.length && candStr < best))
        best = candStr;
    }
  }
  if (best !== null) return Number(best);

  // Otherwise try longer lengths. Usually lenN+1 suffices; we add one more just in case.
  for (let L = lenN + 1; L <= lenN + 2; L++) {
    const lists = subsetCountsForLen(L);
    if (lists.length === 0) continue;
    let minStr = null;
    for (const cnt of lists) {
      const s = buildAscending(cnt);
      if (minStr === null || s < minStr) minStr = s;
    }
    if (minStr !== null) return Number(minStr);
  }

  // Fallback (very unlikely to reach): extend a bit more if needed.
  let L = lenN + 3;
  while (true) {
    const lists = subsetCountsForLen(L);
    if (lists.length) {
      let minStr = null;
      for (const cnt of lists) {
        const s = buildAscending(cnt);
        if (minStr === null || s < minStr) minStr = s;
      }
      return Number(minStr);
    }
    L++;
  }
};


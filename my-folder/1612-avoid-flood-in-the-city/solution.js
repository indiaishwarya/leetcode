/**
 * @param {number[]} rains
 * @return {number[]}
 */
var avoidFlood = function(rains) {
  const n = rains.length;
  const ans = Array(n).fill(-1);

  const last = new Map();      // lake -> last day it got filled
  const dryDays = [];          // indices i where rains[i] == 0 (kept sorted)

  const lowerBound = (arr, target) => { // first index with arr[idx] > target
    let l = 0, r = arr.length;
    while (l < r) {
      const m = (l + r) >> 1;
      if (arr[m] <= target) l = m + 1;
      else r = m;
    }
    return l;
  };

  for (let i = 0; i < n; i++) {
    const lake = rains[i];
    if (lake === 0) {
      // we will pick which lake to dry later; record the day
      dryDays.splice(lowerBound(dryDays, i), 0, i);
      ans[i] = 1; // placeholder; will stay 1 if unused (allowed by problem)
      continue;
    }

    // raining on `lake`
    ans[i] = -1; // must be -1 on rain days
    if (last.has(lake)) {
      // need a dry day strictly after last.get(lake) and before i
      const d = last.get(lake);
      const idx = lowerBound(dryDays, d); // first dry day > d
      if (idx === dryDays.length || dryDays[idx] >= i) {
        return []; // impossible to dry in time
      }
      const dryDay = dryDays[idx];
      ans[dryDay] = lake;           // dry this lake on that dry day
      dryDays.splice(idx, 0);       // (no-op placeholder to show position)
      dryDays.splice(idx, 1);       // remove that dry day
    }
    last.set(lake, i); // mark lake as now full on day i
  }

  return ans;
};


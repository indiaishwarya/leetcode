/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function(spells, potions, success) {
  potions.sort((a, b) => a - b);

  const lowerBound = (arr, target) => {
    let l = 0, r = arr.length;
    while (l < r) {
      const m = (l + r) >> 1;
      if (arr[m] < target) l = m + 1;
      else r = m;
    }
    return l; // first index with arr[idx] >= target
  };

  const res = new Array(spells.length);
  for (let i = 0; i < spells.length; i++) {
    const s = spells[i];
    // smallest potion value needed so that s * p >= success
    const need = Math.ceil(success / s);
    const idx = lowerBound(potions, need);
    res[i] = potions.length - idx;
  }
  return res;
};


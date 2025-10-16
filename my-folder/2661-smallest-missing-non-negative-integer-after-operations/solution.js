/**
 * @param {number[]} nums
 * @param {number} value
 * @return {number}
 */
var findSmallestInteger = function(nums, value) {
  const cnt = new Map();
  for (const x of nums) {
    // normalize residue to [0, value-1]
    const r = ((x % value) + value) % value;
    cnt.set(r, (cnt.get(r) || 0) + 1);
  }

  let mex = 0;
  while (true) {
    const r = mex % value;
    const c = cnt.get(r) || 0;
    if (c > 0) {
      cnt.set(r, c - 1); // use one number with residue r to represent mex
      mex++;
    } else {
      return mex;
    }
  }
};


/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findXSum = function(nums, k, x) {
  const n = nums.length;
  const ans = [];
  if (k === 0) return Array(n + 1).fill(0);
  if (k > n) return [];

  const freq = new Map();

  const add = (v) => freq.set(v, (freq.get(v) || 0) + 1);
  const del = (v) => {
    const f = freq.get(v);
    if (f === 1) freq.delete(v);
    else freq.set(v, f - 1);
  };

  // initialize first window
  for (let i = 0; i < k; i++) add(nums[i]);

  const xSum = () => {
    // entries: [value, count]
    const arr = Array.from(freq.entries()); // [ [value, count], ... ]
    // sort by count desc, value desc
    arr.sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return b[0] - a[0];
    });
    let keep = Math.min(x, arr.length);
    let s = 0;
    for (let i = 0; i < keep; i++) {
      const [val, cnt] = arr[i];
      s += val * cnt;
    }
    return s;
  };

  ans.push(xSum());

  for (let i = 0; i + k < n; i++) {
    del(nums[i]);
    add(nums[i + k]);
    ans.push(xSum());
  }

  return ans;
};


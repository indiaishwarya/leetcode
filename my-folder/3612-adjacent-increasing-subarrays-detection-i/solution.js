/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var hasIncreasingSubarrays = function(nums, k) {
  const n = nums.length;
  if (2 * k > n) return false;
  if (k === 1) return n >= 2; // two adjacent length-1 windows always exist

  // incEnd[i] = length of strictly increasing run ending at i
  const incEnd = new Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    incEnd[i] = (nums[i - 1] < nums[i]) ? incEnd[i - 1] + 1 : 1;
  }

  // check adjacent windows of length k: [s .. s+k-1] and [s+k .. s+2k-1]
  for (let s = 0; s + 2 * k - 1 < n; s++) {
    const end1 = s + k - 1;
    const end2 = s + 2 * k - 1;
    if (incEnd[end1] >= k && incEnd[end2] >= k) return true;
  }
  return false;
};


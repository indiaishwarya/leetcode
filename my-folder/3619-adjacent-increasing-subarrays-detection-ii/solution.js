/**
 * @param {number[]} nums
 * @return {number}
 */
var maxIncreasingSubarrays = function(nums) {
  const n = nums.length;
  if (n < 2) return 0;

  const L = new Array(n).fill(1); // run ending at i
  for (let i = 1; i < n; i++) {
    L[i] = nums[i - 1] < nums[i] ? L[i - 1] + 1 : 1;
  }

  const R = new Array(n).fill(1); // run starting at i
  for (let i = n - 2; i >= 0; i--) {
    R[i] = nums[i] < nums[i + 1] ? R[i + 1] + 1 : 1;
  }

  let ans = 0;
  for (let s = 0; s < n - 1; s++) {
    ans = Math.max(ans, Math.min(L[s], R[s + 1]));
  }
  return ans;
};


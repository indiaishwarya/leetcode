/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarraySum = function(nums, k) {
    const n = nums.length;
    const prefix = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        prefix[i] = prefix[i - 1] + nums[i - 1];
    }
    const minPrefix = new Array(k).fill(Infinity);
    minPrefix[0] = 0;

    let ans = -Infinity;

    for (let i = 1; i <= n; i++) {
        const r = i % k;
        if (minPrefix[r] !== Infinity) {
            const candidate = prefix[i] - minPrefix[r];
            if (candidate > ans) ans = candidate;
        }
        if (prefix[i] < minPrefix[r]) {
            minPrefix[r] = prefix[i];
        }
    }
    return ans;
};

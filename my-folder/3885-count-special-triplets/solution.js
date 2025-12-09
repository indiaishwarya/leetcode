/**
 * @param {number[]} nums
 * @return {number}
 */
var specialTriplets = function(nums) {
    const MOD = 1_000_000_007;
    const n = nums.length;

    const right = {};
    for (const x of nums) {
        right[x] = (right[x] || 0) + 1;
    }

    const left = {};
    let ans = 0;

    for (let j = 0; j < n; j++) {
        const x = nums[j];

        // move current value from right to middle
        right[x]--;
        if (right[x] === 0) delete right[x];

        const target = x * 2;
        const leftCount = left[target] || 0;
        const rightCount = right[target] || 0;

        ans = (ans + leftCount * rightCount) % MOD;

        // add current value to left
        left[x] = (left[x] || 0) + 1;
    }

    return ans;
    
};

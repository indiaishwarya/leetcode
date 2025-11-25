/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    nums.sort((a,b) => a-b);

    let prev = nums[0];
    let res = null;

    for (let i = 1; i < nums.length; i++) {
        if (prev !== nums[i] - 1) {
            res = nums[i] - 1;
            return res;  // can return immediately
        }
        prev = nums[i];
    }
    if (nums[0] !== 0) return 0;
    return nums[nums.length - 1] + 1;
    
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var countPartitions = function(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
    if (total % 2 !== 0) {
        return 0;
    }
    return nums.length - 1;  
};

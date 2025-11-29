/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function(nums, k) {
    const sum = nums.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum % k;
};

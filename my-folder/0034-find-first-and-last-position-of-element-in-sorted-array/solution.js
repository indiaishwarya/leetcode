/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let one = nums.indexOf(target);
    let last = nums.lastIndexOf(target);
    return [one, last]
};

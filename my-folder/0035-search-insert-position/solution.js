/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let val = null;
    if(nums.includes(target)) {
        val = nums.indexOf(target);
    } else {
        for(let i=0; i<nums.length; i++) {
            if(target < nums[i]) {
                val = i;
                break;
            }
        }
        if(val == null) {
            val = nums.length;
        }
    }
    return val;
};

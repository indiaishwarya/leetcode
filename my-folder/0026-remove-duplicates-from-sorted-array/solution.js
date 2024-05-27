/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    // let newObj = {};
    // for(let i=0;i<nums.length;i++) {
    //     newObj[nums[i]] = newObj[nums[i]]+1 || 1; 
    // }
    // console.log('res---', Object.keys(newObj))
    // return Object.keys(newObj);
    // for(let i=0; i<nums.length; i++) {
    //     if(nums.includes(nums[i])) {
    //         nums.splice(nums[i],1)
    //         console.log('nums', nums);
    //     }
    // }
    // return nums;
    let j = 0;
    for (let i = 1, len = nums.length; i < len; i++) {
        if (nums[i] !== nums[j]) {
            nums[++j] = nums[i];
        }
    }
    
    return j + 1;
};

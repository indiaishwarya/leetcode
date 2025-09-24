/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    // let arr = [];
    // let count = 0;
    // for(let i=nums.length-1; i>=0; i--) {
    //     if(nums[i]!=0) {
    //         arr.push(nums.pop())
    //     } else {
    //         nums.pop()
    //         count++;
    //     }
    // }
    // arr.reverse();
    // for(let j=0; j<count; j++) {
    //     arr.push(0);
    // }
    // console.log('sadfkv', arr, count);
    let insertPos = 0;

    // Move all non-zero elements to the front
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[insertPos] = nums[i];
            insertPos++;
        }
    }

    // Fill the rest with zeroes
    for (let i = insertPos; i < nums.length; i++) {
        nums[i] = 0;
    }
    return nums;
    
};

/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function(candies, extraCandies) {
    let newArr = [];
    let val = 0;
    let boolval = null;
    for(let i=0; i<candies.length; i++) {
        val = extraCandies + candies[i];
        for(let j=0; j<candies.length; j++) {
            if(val >= candies[j]) {
                boolval = true;
            } else {
                boolval = false;
                break;
            }
        }
        newArr[i] = boolval;
    }
    return newArr;
    
};

/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function(candies, extraCandies) {
    let newArr = Array(candies.length).fill(true);
    let val = 0;
    for(let i=0; i<candies.length; i++) {
        val = candies[i] + extraCandies;
        for(let j=0; j<candies.length; j++) {
            if(i != j) {
                if(val < candies[j]) {
                    console.log('val--------', candies[j], j)
                    newArr[i] = false;
                    break;
                }
            }
        }
    }
    console.log('ARR----------', newArr);
    return newArr;
};

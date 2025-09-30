/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function(gain) {
    let newArr = [gain[0]];
    for(let i=1; i<gain.length; i++) {
        newArr[i] = gain[i] + newArr [i-1]
    }
    newArr = [0, ...newArr];
    return Math.max(...newArr)
};

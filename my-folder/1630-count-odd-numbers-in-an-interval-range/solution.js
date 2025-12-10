/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countOdds = function(low, high) {
    const oddsUpToHigh = Math.floor((high + 1) / 2);
    const oddsBeforeLow = Math.floor(low / 2);
    return oddsUpToHigh - oddsBeforeLow;
};

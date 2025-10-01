/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var numWaterBottles = function(numBottles, numExchange) {
    let total = 0, full = numBottles, empty = 0;
    while (full > 0) {
        total += full;
        empty += full;
        full = Math.floor(empty / numExchange);
        empty = empty % numExchange;
    }
    return total;
};

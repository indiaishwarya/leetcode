/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var maxBottlesDrunk = function(numBottles, numExchange) {
    let total = numBottles, full=numBottles, empty = 0;
    while(full >= numExchange) {
        full = full - numExchange + 1;
        total ++;
        numExchange++;
    }
    return total;
};

/**
 * @param {number[]} prices
 * @return {number}
 */
var getDescentPeriods = function(prices) {
    const n = prices.length;
    if (n === 0) return 0;

    let ans = 1;
    let curr = 1;

    for (let i = 1; i < n; i++) {
        if (prices[i] === prices[i - 1] - 1) {
            curr += 1;
        } else {
            curr = 1;
        }
        ans += curr;
    }

    return ans;
};

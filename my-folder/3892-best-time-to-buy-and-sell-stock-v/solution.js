/**
 * @param {number[]} prices
 * @param {number} k
 * @return {number}
 */
var maximumProfit = function(prices, k) {
    const n = prices.length;
    if (n === 0 || k === 0) return 0;

    const NEG_INF = -1e18;

    // dpFlat[t]  = max profit with t completed transactions, no open position
    // dpLong[t]  = max profit with t completed transactions, currently long
    // dpShort[t] = max profit with t completed transactions, currently short
    let dpFlat  = new Array(k + 1).fill(NEG_INF);
    let dpLong  = new Array(k + 1).fill(NEG_INF);
    let dpShort = new Array(k + 1).fill(NEG_INF);

    dpFlat[0] = 0; // start with no transactions, no position

    for (let price of prices) {
        const nextFlat  = new Array(k + 1).fill(NEG_INF);
        const nextLong  = new Array(k + 1).fill(NEG_INF);
        const nextShort = new Array(k + 1).fill(NEG_INF);

        for (let t = 0; t <= k; t++) {
            if (dpFlat[t] > NEG_INF / 2) {
                // stay flat
                if (dpFlat[t] > nextFlat[t]) nextFlat[t] = dpFlat[t];

                // open long (buy) – still t completed
                const openLong = dpFlat[t] - price;
                if (openLong > nextLong[t]) nextLong[t] = openLong;

                // open short (sell) – still t completed
                const openShort = dpFlat[t] + price;
                if (openShort > nextShort[t]) nextShort[t] = openShort;
            }

            if (dpLong[t] > NEG_INF / 2) {
                // keep holding long
                if (dpLong[t] > nextLong[t]) nextLong[t] = dpLong[t];

                // close long if we still have capacity
                if (t + 1 <= k) {
                    const closeLong = dpLong[t] + price;
                    if (closeLong > nextFlat[t + 1]) nextFlat[t + 1] = closeLong;
                }
            }

            if (dpShort[t] > NEG_INF / 2) {
                // keep holding short
                if (dpShort[t] > nextShort[t]) nextShort[t] = dpShort[t];

                // close short if we still have capacity
                if (t + 1 <= k) {
                    const closeShort = dpShort[t] - price;
                    if (closeShort > nextFlat[t + 1]) nextFlat[t + 1] = closeShort;
                }
            }
        }

        dpFlat = nextFlat;
        dpLong = nextLong;
        dpShort = nextShort;
    }

    // Best profit with all positions closed
    let ans = 0;
    for (let t = 0; t <= k; t++) {
        if (dpFlat[t] > ans) ans = dpFlat[t];
    }

    return ans;
};

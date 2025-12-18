/**
 * @param {number[]} prices
 * @param {number[]} strategy
 * @param {number} k
 * @return {number}
 */
var maxProfit = function(prices, strategy, k) {
    const n = prices.length;

    // Base profit without any modification
    let base = 0;
    for (let i = 0; i < n; i++) {
        base += strategy[i] * prices[i];
    }

    if (k > n) return base; // cannot choose k consecutive days

    const half = k / 2;

    // Precompute arrays for modification deltas
    const a = new Array(n); // when set to 0: delta = (0 - strategy[i]) * prices[i]
    const b = new Array(n); // when set to 1: delta = (1 - strategy[i]) * prices[i]
    for (let i = 0; i < n; i++) {
        a[i] = -strategy[i] * prices[i];
        b[i] = (1 - strategy[i]) * prices[i];
    }

    // Prefix sums of a and b
    const prefA = new Array(n + 1).fill(0);
    const prefB = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefA[i + 1] = prefA[i] + a[i];
        prefB[i + 1] = prefB[i] + b[i];
    }

    let bestDelta = 0;

    // Slide window of length k
    for (let s = 0; s + k <= n; s++) {
        const mid = s + half;
        const end = s + k;

        const deltaFirstHalf = prefA[mid] - prefA[s];
        const deltaSecondHalf = prefB[end] - prefB[mid];

        const delta = deltaFirstHalf + deltaSecondHalf;
        if (delta > bestDelta) bestDelta = delta;
    }

    return base + bestDelta;
    
};

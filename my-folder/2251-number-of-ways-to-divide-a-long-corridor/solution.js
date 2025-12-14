/**
 * @param {string} corridor
 * @return {number}
 */
var numberOfWays = function(corridor) {
    const MOD = 1_000_000_007;
    const n = corridor.length;
    const seats = [];
    for (let i = 0; i < n; i++) {
        if (corridor[i] === 'S') seats.push(i);
    }
    if (seats.length === 0 || seats.length % 2 === 1) return 0;
    let ways = 1;
    for (let i = 2; i < seats.length; i += 2) {
        const gap = seats[i] - seats[i - 1];
        ways = (ways * gap) % MOD;
    }
    return ways;
};

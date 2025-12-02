/**
 * @param {number[][]} points
 * @return {number}
 */
var countTrapezoids = function(points) {
    const MOD = 1000000007n;

    // 1. Count points per y
    const yCount = new Map();
    for (const [x, y] of points) {
        yCount.set(y, (yCount.get(y) || 0) + 1);
    }

    // 2. For each y, compute number of horizontal segments C(cnt, 2)
    //    and accumulate sum over pairs of y's: sum_{i<j} pairs[i]*pairs[j]
    let ans = 0n;
    let sumPairs = 0n;   // running sum of pairs for previous y's

    for (const cnt of yCount.values()) {
        if (cnt >= 2) {
            const c = BigInt(cnt);
            const pairs = (c * (c - 1n) / 2n) % MOD; // C(cnt, 2)

            // trapezoids formed with current y and all previous y's
            ans = (ans + pairs * sumPairs) % MOD;

            // update running sum
            sumPairs = (sumPairs + pairs) % MOD;
        }
    }

    return Number(ans);
};


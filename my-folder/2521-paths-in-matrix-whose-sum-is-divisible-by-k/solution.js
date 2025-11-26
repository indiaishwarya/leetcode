/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var numberOfPaths = function(grid, k) {
    const MOD = 1000000007;
    const m = grid.length;
    const n = grid[0].length;

    // dp[i][j][r] = number of paths to (i, j) with sum % k == r
    const dp = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => Array(k).fill(0))
    );

    dp[0][0][grid[0][0] % k] = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;

            const val = grid[i][j];

            for (let r = 0; r < k; r++) {
                let ways = 0;

                if (i > 0) {
                    ways = (ways + dp[i - 1][j][r]) % MOD;
                }
                if (j > 0) {
                    ways = (ways + dp[i][j - 1][r]) % MOD;
                }

                const newR = (r + val) % k;
                dp[i][j][newR] = (dp[i][j][newR] + ways) % MOD;
            }
        }
    }

    return dp[m - 1][n - 1][0];
};


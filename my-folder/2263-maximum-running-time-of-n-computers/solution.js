/**
 * @param {number} n
 * @param {number[]} batteries
 * @return {number}
 */
var maxRunTime = function(n, batteries) {
    // Total available battery time
    let total = 0;
    for (const b of batteries) {
        total += b;
    }

    // Binary search for maximum T
    let left = 0;
    let right = Math.floor(total / n); // upper bound for T

    // Helper to check if we can run all n computers for 'time' minutes
    function canRun(time) {
        let available = 0;
        for (const b of batteries) {
            available += Math.min(b, time);
            if (available >= time * n) return true; // early exit
        }
        return available >= time * n;
    }

    while (left < right) {
        const mid = Math.floor((left + right + 1) / 2); // biased to the right
        if (canRun(mid)) {
            left = mid;      // mid is possible, try bigger
        } else {
            right = mid - 1; // mid is too big, go smaller
        }
    }

    return left;
};


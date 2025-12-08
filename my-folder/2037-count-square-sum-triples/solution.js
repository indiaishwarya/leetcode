/**
 * @param {number} n
 * @return {number}
 */
var countTriples = function(n) {
    let count = 0;

    for (let a = 1; a <= n; a++) {
        for (let b = 1; b <= n; b++) {
            const c2 = a * a + b * b;
            const c = Math.floor(Math.sqrt(c2));

            if (c <= n && c * c === c2) {
                count++;
            }
        }
    }

    return count;
};


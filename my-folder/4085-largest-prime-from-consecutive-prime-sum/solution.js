/**
 * @param {number} n
 * @return {number}
 */
var largestPrime = function(n) {
    if (n < 2) return 0;
    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = false;
    isPrime[1] = false;
    for (let i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    const primes = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) primes.push(i);
    }
    let sum = 0;
    let ans = 0;
    for (let p of primes) {
        sum += p;
        if (sum > n) break;
        if (isPrime[sum]) {
            ans = sum;
        }
    }
    return ans;
};

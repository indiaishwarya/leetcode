/**
 * @param {number} m
 * @param {number} k
 * @param {number[]} nums
 * @return {number}
 */
var magicalSum = function(m, k, nums) {
  const MOD = 1_000_000_007n;
  const n = nums.length;

  // fast pow and inverse (mod prime)
  const modPow = (a, e) => {
    a = BigInt(a) % MOD;
    let res = 1n, b = a, ee = BigInt(e);
    while (ee > 0n) {
      if (ee & 1n) res = (res * b) % MOD;
      b = (b * b) % MOD;
      ee >>= 1n;
    }
    return res;
  };
  const modInv = a => modPow(a, MOD - 2n);

  // factorials / inverse factorials up to m
  const fact = new Array(m + 1).fill(0n);
  const ifact = new Array(m + 1).fill(0n);
  fact[0] = 1n;
  for (let i = 1; i <= m; i++) fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
  ifact[m] = modInv(fact[m]);
  for (let i = m; i >= 1; i--) ifact[i - 1] = (ifact[i] * BigInt(i)) % MOD;

  // precompute powers nums[j]^c for c=0..m
  const powNums = nums.map(v => {
    const arr = new Array(m + 1).fill(0n);
    const base = BigInt(v) % MOD;
    arr[0] = 1n;
    for (let c = 1; c <= m; c++) arr[c] = (arr[c - 1] * base) % MOD;
    return arr;
  });

  const popcount = x => {
    let t = x, cnt = 0;
    while (t > 0) { t &= t - 1; cnt++; }
    return cnt;
  };

  // dp[used] : Map("carry#ones" -> weight)
  let dp = Array.from({ length: m + 1 }, () => new Map());
  dp[0].set("0#0", 1n);

  for (let j = 0; j < n; j++) {
    const next = Array.from({ length: m + 1 }, () => new Map());
    for (let used = 0; used <= m; used++) {
      for (const [key, val] of dp[used].entries()) {
        const [carryStr, onesStr] = key.split('#');
        const carry = parseInt(carryStr, 10);
        const ones = parseInt(onesStr, 10);
        const maxAdd = m - used;

        for (let c = 0; c <= maxAdd; c++) {
          const total = carry + c;
          const bit = total & 1;
          const ncarry = total >> 1;
          const nones = ones + bit;

          // multiply by nums[j]^c / c!
          let w = val;
          if (c > 0) {
            const mult = (powNums[j][c] * ifact[c]) % MOD;
            w = (w * mult) % MOD;
          }

          const nused = used + c;
          const nkey = `${ncarry}#${nones}`;
          const prev = next[nused].get(nkey) ?? 0n;            // <-- FIXED
          next[nused].set(nkey, (prev + w) % MOD);             // <-- FIXED
        }
      }
    }
    dp = next;
  }

  let res = 0n;
  for (const [key, val] of dp[m].entries()) {
    const [carryStr, onesStr] = key.split('#');
    const carry = parseInt(carryStr, 10);
    const ones = parseInt(onesStr, 10);
    if (ones + popcount(carry) === k) res = (res + val) % MOD;
  }

  // multiply by m! to account for permutations among equal counts
  res = (res * fact[m]) % MOD;
  return Number(res);
};


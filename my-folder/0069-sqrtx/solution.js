/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
  if (x < 2) return x;

  let lo = 1, hi = Math.floor(x / 2), ans = 1;

  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (mid <= Math.floor(x / mid)) { // mid*mid <= x
      ans = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return ans;
};

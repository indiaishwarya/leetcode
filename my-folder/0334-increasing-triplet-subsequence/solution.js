/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function(nums) {
  let first = Infinity, second = Infinity;

  for (const n of nums) {
    if (n <= first) {
      first = n;              // smallest so far
    } else if (n <= second) {
      second = n;             // second smallest after 'first'
    } else {
      return true;            // n > second > first ⇒ triplet exists
    }
  }
  return false;
};


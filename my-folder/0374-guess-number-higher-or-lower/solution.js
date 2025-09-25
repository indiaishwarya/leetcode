/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function(n) {
    let l=1;
    let r=n;
    while(l<=r) {
        mid = Math.floor((l+r) / 2);
        let res = guess(mid);
        if(res == 0) 
            return mid;
        else if(res == -1) {
            r = mid-1;
        } else if (res == 1) {
            l=mid+1;
        }
    }
    return -1;
};

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    const INT_MIN = -2147483648, INT_MAX = 2147483647;
    const sign = x < 0 ? -1 : 1;

    const rev = parseInt(String(Math.abs(x)).split('').reverse().join(''), 10) * sign;

    return (rev < INT_MIN || rev > INT_MAX) ? 0 : rev;
};

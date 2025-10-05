/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {
    let res= 0;
    const INT_MIN = -2147483648, INT_MAX = 2147483647;
    if(divisor == 0) {
        return null
    }
    if((dividend/divisor) > 0) {
        res = Math.floor(dividend/divisor)
        if (res > INT_MAX) return INT_MAX;
        if (res < INT_MIN) return INT_MIN;
    } else {
        res = Math.ceil(dividend/divisor)
        if (res > INT_MAX) return INT_MAX;
        if (res < INT_MIN) return INT_MIN;
    }
    return res;
};

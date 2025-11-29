/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
    const INT_MIN = -(2 ** 31);
    const INT_MAX = (2 ** 31) - 1;
    let arr = [];
    s = s.trim();
    if(s[0] == '-' || s[0] == '+') {
        arr.push(s[0]);
        s = s.slice(1);
    }
    for(let i=0; i<s.length; i++) {
        if(s[i] >= '0' && s[i] <= '9') {
            arr.push(s[i])
        } else {
            break;
        }
    }
    if(arr.length === 0) {
        return 0;
    }
    let num = parseInt(arr.join(''), 10);

    if (Number.isNaN(num)) return 0;
    if (num < INT_MIN) return INT_MIN;
    if (num > INT_MAX) return INT_MAX;

    return num;
    
};

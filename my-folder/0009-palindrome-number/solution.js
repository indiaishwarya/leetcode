/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    let temp = 0;
    let num = 0
    let newNum = x
    if(x < 0) {
        return false
    }
    while(newNum > 0) {
        num = newNum % 10
        temp = (temp*10) + num;
        newNum = Math.floor(newNum/10);
    }
    if(temp === x) {
        return true
    } else
        return false
};

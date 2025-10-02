/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    s = s.trim();
    let newArr = s.split(" ");
    return newArr[newArr.length -1].length;
};

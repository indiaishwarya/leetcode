/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    let newStr = s.replace(/\s+/g, " ").replace(/^\s|\s$/g, "");
    return newStr.split(' ').reverse().join(' ');
};

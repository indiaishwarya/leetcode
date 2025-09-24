/**
 * @param {string} s
 * @return {string}
 */
var removeStars = function(s) {
    let newStr = []
    for(let i=0; i<s.length; i++) {
        if(s[i] == '*' && i>0) {
            newStr.pop();
        } else {
            newStr.push(s[i])
        }
    }
    return newStr.join('');
};

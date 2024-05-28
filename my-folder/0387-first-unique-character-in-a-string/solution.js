/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    let newObj = {};
    for(let i=0; i<s.length; i++) {
        newObj[s[i]] = newObj[s[i]] + 1 || 1;
    }
    for(let j=0; j<Object.keys(newObj).length; j++) {
        if(newObj[Object.keys(newObj)[j]] == 1) {
            return s.indexOf(Object.keys(newObj)[j]);
        }
    }
    return -1;
};

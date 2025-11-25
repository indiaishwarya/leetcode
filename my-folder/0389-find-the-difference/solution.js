/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function(s, t) {
    let str = s+t;
    let obj = {};
    for(let i=0; i<str.length; i++) {
        obj[str[i]] = ++obj[str[i]] || 1;
    }
    for(let key in obj) {
        if(obj[key] % 2 == 1) {
            return key;
        }
    }
};

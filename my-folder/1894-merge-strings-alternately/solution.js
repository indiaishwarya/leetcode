/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function(word1, word2) {
    let newStr = "";
    let addStr = word1 + word2;
    let j=addStr.length - word2.length;
    let strLength = word1.length < word2.length ? word2.length : word1.length
    for(let i=0; i<strLength; i++) {
        if(word1[i] === undefined)
            newStr += word2[i];
        else if(word2[i] === undefined)
            newStr += word1[i];
        else
            newStr += word1[i] + word2[i];
    }
    return newStr;
    
};

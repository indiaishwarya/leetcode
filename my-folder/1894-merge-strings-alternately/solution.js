/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function(word1, word2) {
    let lgth = word1.length > word2.length ? word1.length : word2.length;
    let newWord = '';
    for(let i = 0; i<lgth; i++) {
        newWord += word1[i] + word2[i]
    }
    return newWord.replaceAll('undefined', '');
};

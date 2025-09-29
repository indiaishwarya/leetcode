/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
    let arr=[];
    let vow = ['a', 'e', 'i', 'o', 'u'];
    for(let a of s) {
        if(vow.includes(a.toLowerCase())) {
            arr.push(a);
        }
    }
    const res= s.split('')
    for(let i=0; i<res.length; i++) {
        if(vow.includes(s[i].toLowerCase())) {
            res[i] = arr.pop()
        }
    }

    return res.join('');
};

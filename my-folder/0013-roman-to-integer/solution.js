/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const val = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
    let ans = 0;
    for (let i = 0; i < s.length; i++) {
        const cur = val[s[i]];
        const next = i + 1 < s.length ? val[s[i+1]] : 0;
        // if a smaller value comes before a larger one, subtract it
        if (cur < next) ans -= cur;
        else ans += cur;
    }
    return ans;
};

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const res = [];
    const dfs = (cur, open, close) => {
        if (cur.length === 2 * n) { res.push(cur); return; }
        if (open < n)   dfs(cur + '(', open + 1, close);
        if (close < open) dfs(cur + ')', open, close + 1);
    };
    dfs('', 0, 0);
    return res;
};

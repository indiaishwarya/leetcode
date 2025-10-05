/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
  const m = heights.length, n = heights[0].length;
  const pac = Array.from({ length: m }, () => Array(n).fill(false));
  const atl = Array.from({ length: m }, () => Array(n).fill(false));
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

  const dfs = (r, c, vis) => {
    if (vis[r][c]) return;
    vis[r][c] = true;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (
        nr >= 0 && nr < m && nc >= 0 && nc < n &&
        !vis[nr][nc] && heights[nr][nc] >= heights[r][c]
      ) dfs(nr, nc, vis);
    }
  };

  // Pacific: top row & left col
  for (let c = 0; c < n; c++) dfs(0, c, pac);
  for (let r = 0; r < m; r++) dfs(r, 0, pac);

  // Atlantic: bottom row & right col
  for (let c = 0; c < n; c++) dfs(m - 1, c, atl);
  for (let r = 0; r < m; r++) dfs(r, n - 1, atl);

  const res = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pac[r][c] && atl[r][c]) res.push([r, c]);
    }
  }
  return res;
};


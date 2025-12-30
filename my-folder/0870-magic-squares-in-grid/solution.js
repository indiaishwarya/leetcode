/**
 * @param {number[][]} grid
 * @return {number}
 */
var numMagicSquaresInside = function(grid) {

  const R = grid.length, C = grid[0].length;
  let ans = 0;

  const isMagic = (r, c) => {
    // center must be 5 in any 1..9 3x3 magic square
    if (grid[r + 1][c + 1] !== 5) return false;

    const seen = new Array(10).fill(false);
    for (let i = r; i < r + 3; i++) {
      for (let j = c; j < c + 3; j++) {
        const v = grid[i][j];
        if (v < 1 || v > 9 || seen[v]) return false;
        seen[v] = true;
      }
    }

    const s =
      grid[r][c] + grid[r][c + 1] + grid[r][c + 2];

    // rows
    for (let i = 0; i < 3; i++) {
      const rowSum = grid[r + i][c] + grid[r + i][c + 1] + grid[r + i][c + 2];
      if (rowSum !== s) return false;
    }
    // cols
    for (let j = 0; j < 3; j++) {
      const colSum = grid[r][c + j] + grid[r + 1][c + j] + grid[r + 2][c + j];
      if (colSum !== s) return false;
    }
    // diagonals
    const d1 = grid[r][c] + grid[r + 1][c + 1] + grid[r + 2][c + 2];
    const d2 = grid[r][c + 2] + grid[r + 1][c + 1] + grid[r + 2][c];
    return d1 === s && d2 === s;
  };

  for (let r = 0; r + 2 < R; r++) {
    for (let c = 0; c + 2 < C; c++) {
      if (isMagic(r, c)) ans++;
    }
  }
  return ans;
};

/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} guards
 * @param {number[][]} walls
 * @return {number}
 */
var countUnguarded = function(m, n, guards, walls) {
  // cell states
  const EMPTY = 0, GUARD = 1, WALL = 2, SEEN = 3;

  const grid = Array.from({ length: m }, () => Array(n).fill(EMPTY));

  // place guards and walls
  for (const [r, c] of guards) grid[r][c] = GUARD;
  for (const [r, c] of walls)  grid[r][c] = WALL;

  // horizontal sweeps
  for (let r = 0; r < m; r++) {
    // left -> right
    let seen = false;
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === WALL) {
        seen = false;
      } else if (grid[r][c] === GUARD) {
        seen = true;
      } else if (seen && grid[r][c] === EMPTY) {
        grid[r][c] = SEEN;
      }
    }
    // right -> left
    seen = false;
    for (let c = n - 1; c >= 0; c--) {
      if (grid[r][c] === WALL) {
        seen = false;
      } else if (grid[r][c] === GUARD) {
        seen = true;
      } else if (seen && grid[r][c] === EMPTY) {
        grid[r][c] = SEEN;
      }
    }
  }

  // vertical sweeps
  for (let c = 0; c < n; c++) {
    // top -> bottom
    let seen = false;
    for (let r = 0; r < m; r++) {
      if (grid[r][c] === WALL) {
        seen = false;
      } else if (grid[r][c] === GUARD) {
        seen = true;
      } else if (seen && grid[r][c] === EMPTY) {
        grid[r][c] = SEEN;
      }
    }
    // bottom -> top
    seen = false;
    for (let r = m - 1; r >= 0; r--) {
      if (grid[r][c] === WALL) {
        seen = false;
      } else if (grid[r][c] === GUARD) {
        seen = true;
      } else if (seen && grid[r][c] === EMPTY) {
        grid[r][c] = SEEN;
      }
    }
  }

  // count unoccupied & unguarded cells (EMPTY only)
  let ans = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === EMPTY) ans++;
    }
  }
  return ans;
};


/**
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function(grid) {
  const n = grid.length;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

  // Min-heap of [timeSoFar, r, c]
  class MinHeap {
    constructor() { this.a = []; }
    size() { return this.a.length; }
    push(x) { this.a.push(x); this._up(this.a.length - 1); }
    pop() {
      const top = this.a[0];
      const last = this.a.pop();
      if (this.a.length) { this.a[0] = last; this._down(0); }
      return top;
    }
    _up(i) {
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (this.a[p][0] <= this.a[i][0]) break;
        [this.a[p], this.a[i]] = [this.a[i], this.a[p]];
        i = p;
      }
    }
    _down(i) {
      const n = this.a.length;
      while (true) {
        let s = i, l = i*2+1, r = i*2+2;
        if (l < n && this.a[l][0] < this.a[s][0]) s = l;
        if (r < n && this.a[r][0] < this.a[s][0]) s = r;
        if (s === i) break;
        [this.a[s], this.a[i]] = [this.a[i], this.a[s]];
        i = s;
      }
    }
  }

  const heap = new MinHeap();
  const seen = Array.from({length: n}, () => Array(n).fill(false));

  // start at (0,0) with time = grid[0][0]
  heap.push([grid[0][0], 0, 0]);

  while (heap.size()) {
    const [t, r, c] = heap.pop();
    if (seen[r][c]) continue;
    seen[r][c] = true;
    if (r === n - 1 && c === n - 1) return t;

    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= n || nc < 0 || nc >= n || seen[nr][nc]) continue;
      // time to step into neighbor is max(current time, its elevation)
      const nt = Math.max(t, grid[nr][nc]);
      heap.push([nt, nr, nc]);
    }
  }
  return -1; // unreachable (shouldn't happen with valid input)
};


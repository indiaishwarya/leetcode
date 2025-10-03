/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function(heightMap) {
  const m = heightMap.length;
  if (m === 0) return 0;
  const n = heightMap[0].length;
  if (n === 0) return 0;

  // Min-heap: stores [height, i, j]
  class MinHeap {
    constructor(){ this.a = []; }
    size(){ return this.a.length; }
    push(x){ this.a.push(x); this._up(this.a.length - 1); }
    pop(){
      const top = this.a[0];
      const last = this.a.pop();
      if (this.a.length) { this.a[0] = last; this._down(0); }
      return top;
    }
    _up(i){
      const a = this.a;
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (a[p][0] <= a[i][0]) break;
        [a[p], a[i]] = [a[i], a[p]];
        i = p;
      }
    }
    _down(i){
      const a = this.a;
      for (;;) {
        let s = i, l = i * 2 + 1, r = l + 1;
        if (l < a.length && a[l][0] < a[s][0]) s = l;
        if (r < a.length && a[r][0] < a[s][0]) s = r;
        if (s === i) break;
        [a[s], a[i]] = [a[i], a[s]];
        i = s;
      }
    }
  }

  const heap = new MinHeap();
  const vis = Array.from({ length: m }, () => Array(n).fill(false));

  // Push all boundary cells into heap
  for (let i = 0; i < m; i++) {
    for (const j of [0, n - 1]) {
      if (!vis[i][j]) {
        heap.push([heightMap[i][j], i, j]);
        vis[i][j] = true;
      }
    }
  }
  for (let j = 0; j < n; j++) {
    for (const i of [0, m - 1]) {
      if (!vis[i][j]) {
        heap.push([heightMap[i][j], i, j]);
        vis[i][j] = true;
      }
    }
  }

  let water = 0;
  let level = -Infinity;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

  while (heap.size()) {
    const [h, i, j] = heap.pop();
    level = Math.max(level, h); // current boundary water level

    for (const [di, dj] of dirs) {
      const ni = i + di, nj = j + dj;
      if (ni < 0 || nj < 0 || ni >= m || nj >= n || vis[ni][nj]) continue;
      vis[ni][nj] = true;

      const nh = heightMap[ni][nj];
      if (nh < level) water += (level - nh);     // trapped water
      heap.push([Math.max(nh, level), ni, nj]);  // effective boundary height
    }
  }

  return water;
};


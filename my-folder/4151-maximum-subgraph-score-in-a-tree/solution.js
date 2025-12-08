/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} good
 * @return {number[]}
 */
var maxSubgraphScore = function(n, edges, good) {
    const g = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        g[a].push(b);
        g[b].push(a);
    }

    const w = good.map(x => (x === 1 ? 1 : -1));

    const parent = new Array(n).fill(-1);
    const order = [];
    const stack = [0];
    parent[0] = -1;

    // Build parent array and traversal order (rooted at 0)
    while (stack.length) {
        const u = stack.pop();
        order.push(u);
        for (const v of g[u]) {
            if (v === parent[u]) continue;
            parent[v] = u;
            stack.push(v);
        }
    }

    const dpDown = new Array(n).fill(0);

    // Post-order: compute dpDown
    for (let idx = order.length - 1; idx >= 0; idx--) {
        const u = order[idx];
        let s = w[u];
        for (const v of g[u]) {
            if (v === parent[u]) continue;
            if (dpDown[v] > 0) s += dpDown[v];
        }
        dpDown[u] = s;
    }

    const dpUp = new Array(n).fill(0);

    // Pre-order: compute dpUp
    for (const u of order) {
        // total contribution from u side (including dpUp[u] and all children)
        let totalFromU = w[u] + dpUp[u];
        for (const v of g[u]) {
            if (v === parent[u]) continue;
            if (dpDown[v] > 0) totalFromU += dpDown[v];
        }
        // propagate to children
        for (const v of g[u]) {
            if (v === parent[u]) continue;
            let bestFromU = totalFromU;
            if (dpDown[v] > 0) bestFromU -= dpDown[v];
            dpUp[v] = Math.max(0, bestFromU);
        }
    }

    const ans = new Array(n);
    for (let i = 0; i < n; i++) {
        ans[i] = dpDown[i] + dpUp[i];
    }
    return ans;
};

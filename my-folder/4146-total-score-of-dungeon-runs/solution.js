/**
 * @param {number} hp
 * @param {number[]} damage
 * @param {number[]} requirement
 * @return {number}
 */
var totalScore = function(hp, damage, requirement) {
    const n = damage.length;
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + damage[i];
    }

    // Build all values for coordinate compression: prefix sums and thresholds T[i]
    const vals = [];
    for (let i = 0; i <= n; i++) vals.push(prefix[i]);
    const T = new Array(n);
    for (let i = 0; i < n; i++) {
        T[i] = prefix[i + 1] + requirement[i] - hp;
        vals.push(T[i]);
    }

    vals.sort((a, b) => a - b);
    // Remove duplicates
    const comp = [];
    for (let v of vals) {
        if (comp.length === 0 || comp[comp.length - 1] !== v) comp.push(v);
    }

    const indexOf = new Map();
    for (let i = 0; i < comp.length; i++) indexOf.set(comp[i], i);
    const m = comp.length;

    // Fenwick tree (BIT) for counting prefix sums
    const bit = new Array(m + 1).fill(0);
    const add = (pos, delta) => {
        pos += 1;
        while (pos <= m) {
            bit[pos] += delta;
            pos += pos & -pos;
        }
    };
    const sum = (pos) => {
        if (pos < 0) return 0;
        pos += 1;
        let r = 0;
        while (pos > 0) {
            r += bit[pos];
            pos -= pos & -pos;
        }
        return r;
    };

    let ans = 0;
    let total = 0;

    for (let i = 0; i < n; i++) {
        // Insert prefix[i] into BIT (j can be from 0..i)
        const pi = prefix[i];
        add(indexOf.get(pi), 1);
        total++;

        const Ti = T[i];

        // lower_bound for Ti in comp
        let l = 0, r = m;
        while (l < r) {
            const mid = (l + r) >> 1;
            if (comp[mid] >= Ti) r = mid;
            else l = mid + 1;
        }
        if (l < m) {
            const cntGE = total - sum(l - 1);
            ans += cntGE;
        }
    }

    return ans;
};


/**
 * @param {number} n
 * @param {number[][]} meetings
 * @param {number} firstPerson
 * @return {number[]}
 */
var findAllPeople = function(n, meetings, firstPerson) {

    // Union-Find / DSU helpers
    const parent = new Array(n);
    const rank = new Array(n).fill(0);
    for (let i = 0; i < n; i++) parent[i] = i;

    const find = (x) => {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    };

    const union = (x, y) => {
        let rx = find(x);
        let ry = find(y);
        if (rx === ry) return;
        if (rank[rx] < rank[ry]) {
            parent[rx] = ry;
        } else if (rank[rx] > rank[ry]) {
            parent[ry] = rx;
        } else {
            parent[ry] = rx;
            rank[rx]++;
        }
    };

    // Initially, 0 and firstPerson know the secret at time 0
    union(0, firstPerson);

    // Sort meetings by time
    meetings.sort((a, b) => a[2] - b[2]);

    let i = 0;
    const m = meetings.length;

    while (i < m) {
        let time = meetings[i][2];
        const batch = [];

        // Collect all meetings with the same time
        while (i < m && meetings[i][2] === time) {
            batch.push(meetings[i]);
            i++;
        }

        // Union all people in this time batch
        const involved = new Set();
        for (const [x, y] of batch) {
            union(x, y);
            involved.add(x);
            involved.add(y);
        }

        // Roll back connections for components NOT connected to 0
        const root0 = find(0);
        for (const p of involved) {
            if (find(p) !== root0) {
                parent[p] = p;
                rank[p] = 0;
            }
        }
    }

    // Collect all people connected to 0 (who know the secret)
    const result = [];
    const root0 = find(0);
    for (let person = 0; person < n; person++) {
        if (find(person) === root0) {
            result.push(person);
        }
    }

    return result;
};

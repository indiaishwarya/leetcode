/**
 * @param {number} n
 * @param {number[][]} buildings
 * @return {number}
 */
var countCoveredBuildings = function(n, buildings) {
    const rowMinX = new Map();
    const rowMaxX = new Map();
    const colMinY = new Map();
    const colMaxY = new Map();

    for (const [x, y] of buildings) {
        if (!rowMinX.has(y)) {
            rowMinX.set(y, x);
            rowMaxX.set(y, x);
        } else {
            rowMinX.set(y, Math.min(rowMinX.get(y), x));
            rowMaxX.set(y, Math.max(rowMaxX.get(y), x));
        }

        if (!colMinY.has(x)) {
            colMinY.set(x, y);
            colMaxY.set(x, y);
        } else {
            colMinY.set(x, Math.min(colMinY.get(x), y));
            colMaxY.set(x, Math.max(colMaxY.get(x), y));
        }
    }

    let count = 0;
    for (const [x, y] of buildings) {
        const minX = rowMinX.get(y);
        const maxX = rowMaxX.get(y);
        const minY = colMinY.get(x);
        const maxY = colMaxY.get(x);

        if (x > minX && x < maxX && y > minY && y < maxY) {
            count++;
        }
    }
    return count;
};

/**
 * @param {number[][]} points
 * @return {number}
 */
var countTrapezoids = function(points) {
    const n = points.length;

    // gcd on integers
    const gcd = (a, b) => {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b !== 0) {
            const t = a % b;
            a = b;
            b = t;
        }
        return a;
    };

    // hash a rational number a/b into a canonical string
    const fracHash = (a, b) => {
        const g = gcd(a, b);
        if (g === 0) return "0/0";
        let num = a / g;
        let den = b / g;
        let sign = (num * den < 0 && den !== 0) ? "-" : "";
        num = Math.abs(num);
        den = Math.abs(den);
        return sign + num + "/" + den;
    };

    // 1) Count all pairs of parallel, non-collinear segments = trapeziums (trapezoids + parallelograms)
    let trapeziums = 0;
    const parallel = new Map();   // slope -> number of segments with this slope
    const collinear = new Map();  // (slope, line) -> number of segments on this exact line

    for (let i = 0; i < n; i++) {
        const [x2, y2] = points[i];
        for (let j = 0; j < i; j++) {
            const [x1, y1] = points[j];

            let slope, intercept;
            if (x1 !== x2) {
                const dx = x2 - x1;
                const dy = y2 - y1;
                slope = fracHash(dy, dx);

                // line in form dy/dx * x + b, store b*dx as a fraction
                const num = y1 * dx - dy * x1;
                intercept = fracHash(num, dx);
            } else {
                // vertical line: x = const
                slope = "inf";
                intercept = String(x1);
            }

            const lineKey = slope + "," + intercept;
            const pCount = parallel.get(slope) || 0;
            const cCount = collinear.get(lineKey) || 0;

            // New trapeziums contributed by this segment:
            // all previous segments with same slope minus those on the same line
            trapeziums += pCount - cCount;

            parallel.set(slope, pCount + 1);
            collinear.set(lineKey, cCount + 1);
        }
    }

    // 2) Count parallelograms: they have two pairs of parallel & equal-length opposite sides
    let parallelograms = 0;
    const parallelDist = new Map();   // (slope, dist) -> segments
    const collinearDist = new Map();  // (slope, line, dist) -> collinear segments

    for (let i = 0; i < n; i++) {
        const [x2, y2] = points[i];
        for (let j = 0; j < i; j++) {
            const [x1, y1] = points[j];

            let slope, intercept;
            if (x1 !== x2) {
                const dx = x2 - x1;
                const dy = y2 - y1;
                slope = fracHash(dy, dx);

                const num = y1 * dx - dy * x1;
                intercept = fracHash(num, dx);
            } else {
                slope = "inf";
                intercept = String(x1);
            }

            const dx = x1 - x2;
            const dy = y1 - y2;
            const dist = dx * dx + dy * dy; // squared length

            const keyParallel = slope + "," + dist;
            const keyCollinear = slope + "," + intercept + "," + dist;

            const pCount = parallelDist.get(keyParallel) || 0;
            const cCount = collinearDist.get(keyCollinear) || 0;

            // Similar logic: pairs of segments with same slope & length
            // but subtract those on same line (would be degenerate)
            parallelograms += pCount - cCount;

            parallelDist.set(keyParallel, pCount + 1);
            collinearDist.set(keyCollinear, cCount + 1);
        }
    }

    // Each parallelogram was counted twice (once for each parallel side pair)
    return trapeziums - Math.floor(parallelograms / 2);
};


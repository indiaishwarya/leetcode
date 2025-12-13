/**
 * @param {string[]} code
 * @param {string[]} businessLine
 * @param {boolean[]} isActive
 * @return {string[]}
 */
var validateCoupons = function(code, businessLine, isActive) {
    const n = code.length;
    const validBusiness = new Set(["electronics", "grocery", "pharmacy", "restaurant"]);
    const order = { electronics: 0, grocery: 1, pharmacy: 2, restaurant: 3 };
    const re = /^[A-Za-z0-9_]+$/;

    const valid = [];

    for (let i = 0; i < n; i++) {
        const c = code[i];
        const b = businessLine[i];
        const active = isActive[i];

        if (!active) continue;
        if (!validBusiness.has(b)) continue;
        if (typeof c !== "string" || c.length === 0) continue;
        if (!re.test(c)) continue;

        valid.push({ code: c, business: b });
    }

    valid.sort((a, b) => {
        const ob = order[a.business] - order[b.business];
        if (ob !== 0) return ob;
        if (a.code < b.code) return -1;
        if (a.code > b.code) return 1;
        return 0;
    });

    return valid.map(x => x.code);
};


/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortByReflection = function(nums) {
    function reflect(x) {
        if (x === 0) return 0;
        let res = 0;
        while (x > 0) {
            res = (res << 1) | (x & 1);
            x >>= 1;
        }
        return res;
    }
    const arr = nums.map(x => [x, reflect(x)]);
    arr.sort((a, b) => {
        if (a[1] !== b[1]) return a[1] - b[1];
        return a[0] - b[0];
    });
    return arr.map(p => p[0]);    
};

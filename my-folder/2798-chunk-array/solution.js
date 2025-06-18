/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
var chunk = function(arr, size) {
    let res = [];
    i = 0
    j = size
    while (i < arr.length) {
        const tempArr = arr.slice(i, j)
        res.push(tempArr)
        i += size
        j += size
    }
    return res;
};


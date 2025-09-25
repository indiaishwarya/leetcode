/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function(arr) {
    let obj = {};

    // Count occurrences
    for (let i = 0; i < arr.length; i++) {
        obj[arr[i]] = (obj[arr[i]] || 0) + 1;
    }

    // Check if all frequencies are unique
    const frequencies = Object.values(obj);
    const unique = new Set(frequencies);

    return frequencies.length === unique.size;
};

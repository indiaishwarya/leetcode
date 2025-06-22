/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function(arr1, arr2) {
    let res = {};
    let arr = [...arr1, ...arr2];
    for(let obj of arr) {
        let id = obj.id;
        if(res[id]) {
            res[id] = {...res[id], ...obj}
        } else {
            res[id] = obj
        }
    }
    return Object.values(res);
};

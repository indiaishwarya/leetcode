/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function (arr, n) {
    let res = [];
    
    let rec = function (arr, depth){

        for(const item of arr){
            if( Array.isArray(item) && depth < n ){
                
                rec(item, depth + 1);
            } else{
                res.push(item);
            }

        }

    }
    rec(arr, 0);
    return res;
};

/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function(obj) {
  if (Array.isArray(obj)) {
    return obj
      .map(compactObject)                // recursively compact each item
      .filter(Boolean);                  // remove falsy values
  } else if (typeof obj === 'object' && obj !== null) {
    const result = {};
    for (let key in obj) {
      const value = compactObject(obj[key]);
      if (Boolean(value)) {
        result[key] = value;
      }
    }
    return result;
  }
  return obj; // primitive value
};


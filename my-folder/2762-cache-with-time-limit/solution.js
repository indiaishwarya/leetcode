var TimeLimitedCache = function() {
    this.keys = new Map();
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
    const found = this.keys.has(key);
    if (found) clearTimeout(this.keys.get(key).timer);
    this.keys.set(key, {
        value,
        timer: setTimeout(() => {
            this.keys.delete(key);
        }, duration),
    });
    return found;
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function(key) {
    return this.keys.get(key) ? this.keys.get(key).value : -1
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function() {
    return this.keys.size;
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */

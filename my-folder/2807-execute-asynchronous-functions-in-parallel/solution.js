/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAll = function(functions) {
    return new Promise((resolve, reject) => {
        let results = [];
        let resolvedCount = 0;
        let hasRejected = false;
        // Helper function to check if all promises have resolved
        const checkCompletion = () => {
            if (resolvedCount === functions.length) {
                resolve(results.map(r => r.value));
            }
        };

        // Iterate through each function and execute them
        const start = Date.now(); // Capture start time
        functions.forEach((fn, index) => {
            fn().then(value => {
                if (!hasRejected) {
                    results[index] = { t: Date.now() - start, value }; // Calculate time elapsed since start
                    resolvedCount++;
                    checkCompletion();
                }
            }).catch(reason => {
                if (!hasRejected) {
                    hasRejected = true;
                    reject(reason); // Calculate time elapsed since start
                }
            });
        });
    });
};

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */

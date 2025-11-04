/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
  let num = 0;
  let curr = "";
  const stack = []; // each frame: [prevString, repeatCount]

  for (const ch of s) {
    if (ch >= '0' && ch <= '9') {
      num = num * 10 + (ch.charCodeAt(0) - 48); // build multi-digit k
    } else if (ch === '[') {
      stack.push([curr, num]); // save state
      curr = "";
      num = 0;
    } else if (ch === ']') {
      const [prev, k] = stack.pop();
      curr = prev + curr.repeat(k); // expand
    } else {
      curr += ch; // letter
    }
  }
  return curr;
};

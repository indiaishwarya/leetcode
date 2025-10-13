/**
 * @param {string[]} words
 * @return {string[]}
 */
var removeAnagrams = function(words) {
  const res = [];
  let lastSig = "";

  for (const w of words) {
    const sig = w.split("").sort().join("");
    if (sig !== lastSig) {
      res.push(w);
      lastSig = sig;
    }
    // else: skip because it's an anagram of previous kept word
  }
  return res;
};


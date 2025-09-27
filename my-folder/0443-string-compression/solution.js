/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function(chars) {
  let write = 0;
  let i = 0;

  while (i < chars.length) {
    const ch = chars[i];
    let j = i;
    while (j < chars.length && chars[j] === ch) j++;

    // write the character
    chars[write++] = ch;

    // write the count (if > 1), digit by digit
    const count = j - i;
    if (count > 1) {
      for (const d of String(count)) {
        chars[write++] = d;
      }
    }

    i = j;
  }

  // shrink array to new length (optional but nice locally)
  chars.length = write;
  return write;
};

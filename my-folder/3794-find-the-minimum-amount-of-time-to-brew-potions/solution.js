/**
 * @param {number[]} skill
 * @param {number[]} mana
 * @return {number}
 */
var minTime = function(skill, mana) {
  const n = skill.length, m = mana.length;

  // prefix sums of skills: S[0]=0, S[k]=sum_{i=1..k} skill[i-1]
  const S = new Array(n + 1).fill(0);
  for (let k = 1; k <= n; k++) S[k] = S[k - 1] + skill[k - 1];

  // base: time to fully process the last potion through all wizards
  let ans = S[n] * mana[m - 1];

  // add required separations between consecutive potions
  for (let j = 0; j < m - 1; j++) {
    const a = mana[j], b = mana[j + 1];
    let Dj = -Infinity;
    for (let k = 1; k <= n; k++) {
      const val = S[k] * a - S[k - 1] * b;
      if (val > Dj) Dj = val;
    }
    ans += Dj;
  }

  return ans;
};


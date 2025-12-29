/**
 * @param {number[]} apple
 * @param {number[]} capacity
 * @return {number}
 */
var minimumBoxes = function(apple, capacity) {
  let need = 0;
  for (const a of apple) need += a;

  capacity.sort((a, b) => b - a);

  let sum = 0, boxes = 0;
  for (const c of capacity) {
    sum += c;
    boxes++;
    if (sum >= need) return boxes;
  }
  return boxes; // guaranteed enough capacity in constraints
};

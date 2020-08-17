/**
 * Unique Binary Search Trees
 * @constructor
 * https://leetcode.com/problems/unique-binary-search-trees/
 */
function UniqueBST(n) {
  let g = [1, 1];
  for(let i = 2; i <= n; i++) {
    g[i] = 0;
  }
  // G(n) = G(0) * G(n-1) + G(1) * G(n-2) + … + G(n-1) * G(0)
  for(let i = 2; i <= n; i++) {
    for(let j = 1; j <= i; j++) {
      g[i] += g[j-1] * g[i - j];
    }
  }
  return g[n];
}

console.log(UniqueBST(3));
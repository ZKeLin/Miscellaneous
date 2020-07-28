/**
 * Maximal Square
 * @param matrix
 * @constructor
 * @return {number}
 */
function MaximalSquare(matrix) {
  let m = matrix.length, n = 0;
  if(m > 0) {
    n = matrix[0].length;
  }
  let dp = [];
  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    for(let j = 0; j <= n; j++) {
      dp[i][j] = 0;
    }
  }
  console.log(matrix);
  let maxSqLen = 0;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if(matrix[i-1][j-1] === '1') {
        dp[i][j] = Math.min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1]) + 1;
        maxSqLen = Math.max(maxSqLen, dp[i][j]);
      }
    }
  }
  console.log(dp);
  return maxSqLen * maxSqLen;
}

console.log(MaximalSquare([["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]));
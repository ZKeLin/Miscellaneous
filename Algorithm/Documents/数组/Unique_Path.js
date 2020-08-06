/**
 * Unique path
 * @constructor
 */
function UniquePath(m, n) {
  let dp = [];
  for(let i = 0; i < n; i++) {
    let tempArr = [];
    for (let j = 0; j < m; j++){
      tempArr[j] = 1;
    }
    dp.push(tempArr);
  }
  for(let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++){
      dp[i][j] = dp[i][j-1] + dp[i-1][j];
    }
  }
  return dp[n-1][m-1];
}

/**
 * [ [ 1, 1, 1, 1, 1, 1, 1 ],
 *   [ 1, 2, 3, 4, 5, 6, 7 ],
 *   [ 1, 3, 6, 10, 15, 21, 28 ]
 * ]
 */
console.log(UniquePath(7, 3));
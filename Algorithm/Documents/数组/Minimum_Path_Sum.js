/**
 * Minimum Path Sum
 * [
 [1,3,1],
 [1,5,1],
 [4,2,1]
 ]
 */
// 方法一
function MinimumPathSum(grid) {
  let m = grid.length;
  let n = grid[0].length;
  let sum = [];
  for (let i = 0; i < grid.length; i++) {
    let tempArr = new Array(n);
    tempArr[0] = grid[0][0];
    sum.push(tempArr);
  }
  for(let i = 1; i < m; i++) {
    sum[i][0] = sum[i-1][0] + grid[i][0];
  }
  for(let i = 1; i < n; i++) {
    sum[0][i] = sum[0][i-1] + grid[0][i];
  }
  for(let i = 1; i < m; i++) {
    for(let j = 1; j < n; j++) {
      sum[i][j] = Math.min(sum[i][j-1], sum[i-1][j]) + grid[i][j];
    }
  }
  console.log(sum);
  return sum[m-1][n-1];
}

console.log(MinimumPathSum([
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1]
]));
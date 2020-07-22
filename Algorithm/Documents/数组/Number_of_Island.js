/**
 * Number of Island
 * 给定一个只有"0"和"1"的矩阵，"0"代表water，"1"代表land，计算出所有的岛屿数量。一个岛屿被水包围，是通过水平或垂直连接相邻的土地而形成的。 您可以假定网格的所有四个边缘都被水包围。
 */
// Input: grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// Output: 3
function NumberOfIsland(grid) {
  let n, m, count = 0;
  n = grid.length;
  if (n <= 0) return 0;
  m = grid[0].length;
  for (let i = 0; i < n; i++){
    for (let j = 0; j < m; j++) {
      if(grid[i][j] === "1"){
        DFSMark(grid, i, j);
        count++;
      }
    }
  }
  return count;
}

/**
 * 该方法的目的是通过深度优先遍历先将矩阵所有相连的"1"都标记为0，所以后面只要是遇到"1"就count++，最终获取的就是岛屿的数量
 * @param grid
 * @param i
 * @param j
 * @constructor
 */
function DFSMark(grid, i, j) {
  if(i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] === "0"){
    return ;
  }
  grid[i][j] = "0";
  DFSMark(grid, i - 1, j);
  DFSMark(grid, i, j - 1);
  DFSMark(grid, i + 1, j);
  DFSMark(grid, i, j + 1);
}

console.log(NumberOfIsland([
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]));
/**
 * Search a 2D Matrix II
 * https://leetcode.com/problems/search-a-2d-matrix-ii/
 */
function searchMatrix(matrix, target) {
  if(matrix.length === 0 || matrix[0].length === 0){
    return false;
  }

  let row = 0;
  let col = matrix[0].length - 1;

  while(row < matrix.length && col >= 0) {
    if(target === matrix[row][col]){
      return true;
    }else if(target < matrix[row][col]){
      col--;
    }else if(target > matrix[row][col]){
      row++;
    }
  }

  return false;
}

console.log(searchMatrix([
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
], 27));
/**
 * set matrix zeroes
 * Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.
 */

function setMatrixZeroes(matrix) {
  let r = matrix.length;
  let c = matrix[0].length;

  let rSet = new Set();
  let cSet = new Set();

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (matrix[i][j] == 0) {
        rSet.add(i);
        cSet.add(j);
      }
    }
  }

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (rSet.has(i) || cSet.has(j)) {
        matrix[i][j] = 0;
      }
    }
  }
}

function setMatrixZeroes2(matrix) {
  let r = matrix.length;
  let c = matrix[0].length;
  let isColHas0 = false;
  for (let i = 0; i < r; i++) {
    if (matrix[i][0] == 0) isColHas0 = true;
    for (let j = 1; j < c; j++) {
      if (matrix[i][j] === 0) {
        matrix[0][j] = 0;
        matrix[i][0] = 0;
      }
    }
  }
  for (let i = r - 1; i >= 0; i--) {
    for (let j = c - 1; j >= 1; j--)
      if (matrix[i][0] == 0 || matrix[0][j] == 0)
        matrix[i][j] = 0;
    if (isColHas0) matrix[i][0] = 0;
  }
}

let matrix1 = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1]
];

let matrix2 = [
  [1, 1, 2, 0],
  [3, 4, 0, 2],
  [1, 3, 1, 5]
];
setMatrixZeroes2(matrix2);
console.log(matrix2);

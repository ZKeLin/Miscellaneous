/**
 * Maximal Rectangle
 * Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.
 */

function maximalRectangle(matrix) {
  let m = matrix.length;
  let n = matrix[0].length;

  let height = [], left = [], right = [];
  fillArr(height, n, 0);
  fillArr(left, n, 0);
  fillArr(right, n, n);
  for (let i = 0; i < m; i++) {
    let curLeft = 0, curRight = n;
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] == '1') {
        height[j] = height[j] + 1;
      } else {
        height[j] = 0;
      }
      if (matrix[i][j] == '1') left[j] = Math.max(left[j], curLeft);
      else {
        left[j] = 0;
        curLeft = j + 1;
      }

    }
    for(let j=n-1; j>=0; j--) {
      if(matrix[i][j]=='1') right[j]=Math.min(right[j],curRight);
      else {right[j]=n; curRight=j;}
    }
    console.log(height, left, right)
  }
}

function fillArr(arr, n, value) {
  for (let i = 0; i < n; i++) {
    arr[i] = value;
  }
}

maximalRectangle([
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0]
]);
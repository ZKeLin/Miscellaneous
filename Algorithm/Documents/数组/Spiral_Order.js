/**
 * spiral order 螺型顺序
 * 给定一个m * n的二维数组（m行，n列），返回该数组的螺型顺序
 * 
 * Input:
    [
      [ 1, 2, 3 ],
      [ 4, 5, 6 ],
      [ 7, 8, 9 ]
    ]
  Output: [1,2,3,6,9,8,7,4,5]
  Input:
  [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9,10,11,12]
  ]
  Output: [1,2,3,4,8,12,11,10,9,5,6,7]
 */

 const SpiralOrder = function (matrix) {
   let result = [];
   if(matrix.length == 0){
      return result;
   }
   let rowBegin = 0;
   let rowEnd = matrix.length - 1;
   let colBegin = 0;
   let colEnd = matrix[0].length - 1;

   while(rowBegin <= rowEnd && colBegin <= colEnd) {

    for (let i = colBegin; i <= colEnd; i++) {
      result.push(matrix[rowBegin][i]);      
    }
    rowBegin++;

    for(let i = rowBegin; i <= rowEnd; i++){
      result.push(matrix[i][colEnd]);
    }
    colEnd--;

    if(rowBegin <= rowEnd){
      for(let i = colEnd; i >= colBegin; i--){
        result.push(matrix[rowEnd][i]);
      }
    }
    rowEnd--;

    if(colBegin <= colEnd){
      for(let i = rowEnd; i >= rowBegin; i--){
        result.push(matrix[i][colBegin]);
      }
    }
    
    colBegin++;

   }
   return result;
 }

 let matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
 console.log(SpiralOrder(matrix));
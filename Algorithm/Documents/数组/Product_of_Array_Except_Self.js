/**
 * Product of Array Except Self
 */

function productExceptItself(arr) {
  let leftSumArr = [], rightSumArr = [], productArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      leftSumArr.push(1);
    } else {
      leftSumArr.push(leftSumArr[i - 1] * arr[i - 1]);
    }
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    if (i === arr.length - 1) {
      rightSumArr[i] = 1;
    } else {
      rightSumArr[i] = rightSumArr[i + 1] * arr[i + 1];
    }
  }
  for (let i = 0; i < leftSumArr.length; i++) {
    productArr.push(leftSumArr[i] * rightSumArr[i]);
  }
  console.log(leftSumArr, rightSumArr);
  return productArr;
}

console.log(productExceptItself([1, 2, 3, 4]));
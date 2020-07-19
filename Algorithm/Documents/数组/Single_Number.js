/**
 * Single Number
 * @constructor
 * @return {number}
 */

function SingleNumber(arr) {
  let singleNumber = 0;
  for (let i = 0; i < arr.length; i++) {
    singleNumber ^= arr[i];
    console.log(singleNumber);
  }
  return singleNumber;
}

console.log(SingleNumber([4, 1, 2, 1, 2]));
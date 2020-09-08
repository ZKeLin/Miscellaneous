/**
 * Kth Largest Element in an Array
 * https://leetcode.com/problems/kth-largest-element-in-an-array/
 */

/**
 * 快速选择算法跟快排思想类似
 * https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E9%80%89%E6%8B%A9
 * @param arr
 * @param k
 */
function findKthLargest(arr, k) {
  return quickSelect(arr, 0, arr.length - 1, k - 1);
}

function quickSelect(list, left, right, k) {
  if(left === right){
    return list[left];
  }
  let pivotIndex = left;
  pivotIndex = partition(list, left, right, pivotIndex);
  if(k === pivotIndex){
    return list[k];
  }else if(k < pivotIndex) {
    return quickSelect(list, left, pivotIndex - 1, k);
  }else {
    return quickSelect(list, pivotIndex + 1, right, k);
  }
}

function partition(list, left, right, pivotIndex) {
  let pivotValue = list[pivotIndex];
  swap(list, pivotIndex, right);
  let storeIndex = left;
  for (let i = left; i < right; i++) {
    if(list[i] > pivotValue){
      swap(list, i, storeIndex);
      storeIndex++;
    }
  }
  swap(list, right, storeIndex);
  console.log(list);
  return storeIndex;
}

function swap(list, i, j) {
  let temp = list[i];
  list[i] = list[j];
  list[j] = temp;
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));


/**
 * Top K Frequent Elements
 * https://leetcode.com/problems/top-k-frequent-elements/
 * @param nums
 * @param k
 */

function topKFrequent(nums, k) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      map.set(nums[i], [nums[i], map.get(nums[i])[1] + 1]);
      // map.set(nums[i], map.get(nums[i]) + 1/*[nums[i], map.get(nums[i])[1] + 1]*/);
    } else {
      map.set(nums[i], [nums[i], 1]);
      // map.set(nums[i], 1/*[nums[i], 1]*/);
    }
  }
  let frequencyList = [];
  map.forEach(it => {
    frequencyList.push(it);
  });
  let position = quickSelect(frequencyList, 0, frequencyList.length - 1, k - 1);
  let topKList = frequencyList.slice(0, position + 1);
  return topKList.map(it => it[0]);
}

function quickSelect(list, left, right, k) {
  if (left === right) return left;
  let pivotIndex = left;
  pivotIndex = partition(list, left, right, pivotIndex);
  if (k === pivotIndex) {
    return pivotIndex;
  } else if (k < pivotIndex) {
    return quickSelect(list, left, pivotIndex - 1, k);
  } else {
    return quickSelect(list, pivotIndex + 1, right, k);
  }
}

function partition(list, left, right, pivotIndex) {
  let pivotValue = list[pivotIndex][1];
  let storeIndex = left;
  swap(list, pivotIndex, right);
  for (let i = left; i < right; i++) {
    if (list[i][1] > pivotValue) {
      swap(list, i, storeIndex);
      storeIndex++;
    }
  }
  swap(list, right, storeIndex);
  return storeIndex;
}

function swap(list, i, j) {
  let temp = list[i];
  list[i] = list[j];
  list[j] = temp;
}

console.log(topKFrequent([1, 1, 1, 2, 2, 3, 3, 3, 3, 4,4,4, 5], 3));
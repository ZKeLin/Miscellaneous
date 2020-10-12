/**
 * Find All Numbers Disappeared in an Array
 * https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/
 * @param nums
 */

/**
 * space: O(n)
 * time: O(n)
 * @param nums
 * @return {[]}
 */
function findDisappearedNumbers1(nums) {
  let len = nums.length;
  let tempArr = new Array(len).fill(0);
  for (let i = 0; i < len; i++) {
    tempArr[nums[i] - 1] = 1;
  }
  let result = [];
  for (let i = 0; i < len; i++) {
    if(tempArr[i] === 0){
      result.push(i + 1);
    }
  }
  return result;
}

/**
 * space: O(1)
 * time: O(n)
 * @param nums
 * @return {[]}
 */
function findDisappearedNumbers(nums) {
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    let index = Math.abs(nums[i]) - 1;
    nums[index] = nums[index] > 0 ? -nums[index] : nums[index]; //通过添加负号的形式，这样就可以通过取绝对值来获取原先的数据，而不会导致原先数据被修改找不到的情况
  }
  let result = [];
  for (let i = 0; i < n; i++) {
    if(nums[i] > 0) {
      result.push(i + 1);
    }
  }
  return result;
}

findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]);

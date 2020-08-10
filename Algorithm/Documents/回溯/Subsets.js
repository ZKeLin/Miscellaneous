/**
 * Subsets
 * @param nums
 * @return {[]}
 */
function subSets(nums) {
  let list = [];
  backTrace(list, [], nums, 0);
  return list;
}

function backTrace(list, temp, nums, start) {
  list.push(temp);
  for (let i = start; i < nums.length; i++) {
    temp.push(nums[i]);
    backTrace(list, [...temp], nums, i + 1);
    temp.pop();
  }
}

console.log(subSets([1, 2, 3]));
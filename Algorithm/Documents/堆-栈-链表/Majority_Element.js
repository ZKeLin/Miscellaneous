/**
 * Majority Element
 * 元素出现次数超过数组长度一半的元素为Majority Element
 * @param nums
 */

// 只有元素超过一半才可以使用该方法。
function majorityElement(nums) {
  let count = 0;
  let majorityNum = null;
  let i = 0;
  while(i < nums.length) {
    if(count === 0){
      majorityNum = nums[i];
    }
    count += (majorityNum === nums[i]) ? 1 : -1;
    i++;
  }

  return majorityNum;
}

console.log(majorityElement([2, 2, 1, 1, 1, 2, 1]));
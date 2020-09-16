/**
 * Find the Duplicate Number
 * https://leetcode.com/problems/find-the-duplicate-number/
 */
const ListNode = require('../堆-栈-链表/ListNode');

// 方法1： set/map记录每个值，时间复杂度O(n) 空间复杂度O(n)
function findDuplicateByMap(nums) {
  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      return nums[i];
    } else {
      map.set(nums[i], [i]);
    }
  }
}

// 方法2：排序 则使用的是排序的时间空间复杂度
function findDuplicateBySort(nums) {
  // todo
}

// 方法3：使用链表 数组的索引为链表节点的值，索引对应的值为链表的下一个节点，相同的值则为链表环的入口地方，最终问题变为求链表环的入口
// 前提是数组中的每个值必须在数组索引的范围内
function findDuplicateByLinkedList(nums) {

  let slow = nums[0];
  let fast = nums[0];
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  }while(slow !== fast);

  slow = nums[0];
  while(slow !== fast){
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
}

console.log(findDuplicateByLinkedList([1, 3, 4, 2, 2]));
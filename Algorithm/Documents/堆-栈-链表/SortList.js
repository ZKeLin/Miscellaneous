/**
 * Sort List
 * https://leetcode.com/problems/sort-list/
 */

const ListNode = require('./ListNode');
// 归并排序
function sortList(head) {
  if(head == null || head.next === null) {
    return head;
  }
  let middle = getMiddle(head);
  console.log(middle, head);
  let list1 = sortList(head);
  let list2 = sortList(middle);
  return merge(list1, list2);
}

/**
 * 将链表分为前半部分和后半部分
 * @param head
 * @return {*}
 */
function getMiddle(head) {
  let slow = head;
  let fast = head;
  let prev = null;
  while(fast != null && fast.next != null) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  prev.next = null; // 将head后半部分置为null不然head还是整个列表
  return slow;
}

function merge(list1, list2) {
  let tempList = new ListNode(0), cacheList = tempList;

  while(list1 != null && list2 != null) {
    if(list1.val < list2.val){
      tempList.next = list1;
      list1 = list1.next;
    }else{
      tempList.next = list2;
      list2 = list2.next;
    }
    tempList = tempList.next;
  }

  if(list1 != null){
    tempList.next = list1;
  }
  if(list2 != null) {
    tempList.next = list2;
  }

  return cacheList.next;
}


let head = new ListNode(4, new ListNode(2, new ListNode(1, new ListNode(3, null))));

console.log(sortList(head));

// todo 快排
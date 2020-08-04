/**
 * Merge k Sorted Lists
 */

/**
 * Definition for singly-linked list.
 * @param val
 * @param next
 * @constructor
 */
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val);
  this.next = (next===undefined ? null : next);
}

function mergeKLists(lists) {
  let amount = lists.length;
  let interval = 1;
  while(interval < amount) {
    for(let i = 0; i < amount; i += interval * 2) {
      lists[i] = merge2Lists(lists[i], lists[i + interval]);
    }
    interval *= 2;
  }
  return lists[0] ? lists[0] : null;
}

function merge2Lists(list1, list2) {
  let head = point = new ListNode(0);
  while(list1 && list2) {
    if(list1.val <= list2.val){
      point.next = new ListNode(list1.val);
      list1 = list1.next;
    }else {
      point.next = new ListNode(list2.val);
      list2 = list2.next;
    }
    point = point.next;
  }
  if(!list1){
    point.next = list2;
  }else if(!list2) {
    point.next = list1;
  }
  return head.next;
}

let list1 = new ListNode(1, new ListNode(3, new ListNode(4)));
let list2 = new ListNode(1, new ListNode(4, new ListNode(5)));
// let list3 = new ListNode(2, new ListNode(6));

console.log(mergeKLists([list1, list2]));

function printListNode(listNode) {
  while(listNode) {
    console.log(listNode.val);
    listNode = listNode.next;
  }
}
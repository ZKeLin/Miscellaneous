/**
 * Reverse Linked List
 * https://leetcode.com/problems/reverse-linked-list/solution/
 */

const ListNode = require('./ListNode');

function reverseLinkedList(linkList) {
  let pre = null;
  let cur = linkList;
  while(cur !== null) {
    let tempNode = cur.next;
    cur.next = pre;
    pre = cur;
    cur = tempNode;
  }
  return pre;
}

console.log(reverseLinkedList(new ListNode(1, new ListNode(2, new ListNode(3, null)))));
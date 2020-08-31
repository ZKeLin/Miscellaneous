/**
 * Intersection of Two Linked Lists
 * @param headA
 * @param headB
 */

const ListNode = require('./ListNode');

function getIntersectionNode(headA, headB) {
  if(headA === null || headB === null){
    return null;
  }

  let a = headA, b = headB;

  while(a !== b) {
    a = a === null ? headB : a.next;
    b = b === null ? headA : b.next;
  }

  return a;
}

let common = new ListNode(6, new ListNode(8, null))

let headA = new ListNode(0, new ListNode(1, new ListNode(2, common)));
let headB = new ListNode(4, new ListNode(10, new ListNode(4, new ListNode(12, common))));

console.log(getIntersectionNode(headA, headB));
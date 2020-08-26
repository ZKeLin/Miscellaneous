/**
 * Linked List Cycle
 * https://leetcode.com/problems/linked-list-cycle/
 */

function ListNode(val, next) {
  this.val = val;
  this.next = next;
}

function hasCycle(head) {
  if(head === null || head.next === null){
    return false;
  }
  let slow = head;
  let fast = head.next;
  while(slow !== fast){
    if(fast === null || fast.next === null){
      return false;
    }
    console.log(slow);
    console.log(fast);
    slow = slow.next;
    fast = fast.next.next;
  }

  return true;
}

let node1 = new ListNode(0);
let node2 = new ListNode(2, node1);
let node3 = new ListNode(3, node2);
let node4 = new ListNode(4, node3);
let node5 = new ListNode(5, node4);
let node6 = new ListNode(6, node5);
let node7 = new ListNode(7, node6);
node1.next = node3;

console.log(hasCycle(node7));
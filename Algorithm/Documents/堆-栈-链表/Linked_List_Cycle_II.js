/**
 * Linked list Cycle II
 * https://leetcode.com/problems/linked-list-cycle-ii/
 * @param val
 * @param next
 * @constructor
 */

function ListNode(val, next) {
  this.val = val;
  this.next = next;
}

function detectCycle(head) {
  if(head === null || head.next === null){
    return null;
  }

  let slowP = head;
  let fastP = head;
  let isCycle = false;

  while(slowP !== null && fastP !== null) {
    slowP = slowP.next;
    if(fastP.next === null) return null;
    fastP = fastP.next.next;
    if(fastP === slowP) {
      isCycle = true;
      break;
    }
  }

  // return slowP;
  console.log(slowP, fastP);
  slowP = head;

  while(slowP !== fastP) {
    slowP = slowP.next;
    fastP = fastP.next;
  }

  return slowP;

}


let node1 = new ListNode(0);
let node2 = new ListNode(2, node1);
let node3 = new ListNode(3, node2);
let node4 = new ListNode(4, node3);
let node5 = new ListNode(5, node4);
let node6 = new ListNode(6, node5);
let node7 = new ListNode(7, node6);
node1.next = node3;

console.log(detectCycle(node7));
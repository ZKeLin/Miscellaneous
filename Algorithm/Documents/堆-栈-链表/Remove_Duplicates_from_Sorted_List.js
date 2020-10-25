/**
 *
 * https://leetcode.com/problems/remove-duplicates-from-sorted-list/
 */
const ListNode = require('./ListNode');

function deleteDuplicates(head) {
  if(!head) return head;
  let tempValue = head.val;
  let tempList = head;
  while(head && head.next) {
    if(head.next.val === tempValue){
      let tempItem = head.next.next;
      head.next = head.next.next;
      tempItem = null;
    }else{
      tempValue = head.next.val
      head = head.next;
    }
  }
  return tempList;
}
let head = new ListNode(1, new ListNode(1, new ListNode(1)));
let head2 = new ListNode(1, new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3)))));
console.log(deleteDuplicates(head2));
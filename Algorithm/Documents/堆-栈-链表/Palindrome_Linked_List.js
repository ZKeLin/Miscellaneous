/**
 * Palindrome Linked List
 * https://leetcode.com/problems/palindrome-linked-list/
 * @param head
 */
const ListNode = require('./ListNode');

function isPalindrome(head) {
  let slow = head, fast = head;
  while(fast != null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  if(fast !== null){ // odd link list
    slow = slow.next;
  }
  fast = head;
  slow = reverseLinkList(slow);

  while(slow !== null) {
    if(slow.val !== fast.val){
      return false;
    }
    fast = fast.next;
    slow = slow.next;
  }
  return true;
}

function reverseLinkList(head) {
  let prev = null;
  let cur = head;
  while(cur != null) {
    let temp = cur.next;
    cur.next = prev;
    prev = cur;
    cur = temp;
  }
  return prev;
}

console.log(isPalindrome(new ListNode(1, new ListNode(3, new ListNode(2, new ListNode(1, null))))));
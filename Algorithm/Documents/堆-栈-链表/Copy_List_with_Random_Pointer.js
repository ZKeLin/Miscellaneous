/**
 * Copy List with Random Pointer
 * https://leetcode.com/problems/copy-list-with-random-pointer/
 */

function Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
}

function copyRandomList(head) {
  let iter = head, next;

  while(iter !== null) {
    next = iter.next;

    let copy = new Node(iter.val);
    iter.next = copy;
    copy.next = next;

    iter = next;
  }

  iter = head;
  while(iter !== null) {
    if(iter.random) {
      iter.next.random = iter.random.next;
    }
    iter = iter.next.next;
  }

  iter = head;
  let first = new Node(0);
  let copyIter = first;
  let copy;
  while (iter != null) {
    next = iter.next.next;

    copy = iter.next;
    copyIter.next = copy;
    copyIter = copyIter.next;

    iter.next = next;

    iter = next;
  }

  return first.next;

}
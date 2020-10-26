/**
 * https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/
 */
const ListNode = require('./ListNode');

/**
 * 主要维护两个指针，一个指向当前元素，一个指向前一个元素（始终保持前一个元素为非duplicate元素）
 * @param head
 * @return {null}
 */

function deleteDuplicatesII(head){
  if(!head) return null;
  let currentNode = head;
  let preNode = head;
  let duplicateNode;
  while (currentNode && currentNode.next) {
    if(currentNode.val === currentNode.next.val){
      currentNode.next = currentNode.next.next;
      duplicateNode = currentNode;
    }else{
      if(duplicateNode === currentNode){
        preNode.next = currentNode.next;
      }else{ // 只有duplicateNode和currentNode不相等时才将preNode = currentNode
        preNode = currentNode;
      }
      if(duplicateNode === head){ // 说明是头部是duplicate元素
        head = currentNode.next;
      }
      currentNode = currentNode.next;
    }
  }
  if(duplicateNode && duplicateNode.next === null){ // 说明尾部是duplicate元素,在后面进行特殊处理一下
    preNode.next = null;
  }
  if(duplicateNode === head && head.next === null){ // 如果头部是duplicate元素并且head.next === null 说明该链表全是重复元素
    return null;
  }
  return head;
}
let head2 = new ListNode(1, new ListNode(1, new ListNode(1, new ListNode(1, new ListNode(1)))));
let head1 = new ListNode(1, new ListNode(1, new ListNode(1, new ListNode(2, new ListNode(2)))));
let head3 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3, new ListNode(4, new ListNode(4, new ListNode(5)))))));
console.log(deleteDuplicatesII(head3));

/**
 * 填充每个节点的下一个右侧节点指针
 * https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/
 */

function Node(val, left, right, next) {
  this.val = val === undefined ? null : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
  this.next = next === undefined ? null : next;
}

function connect(root) {
  if (!root) {
    return root;
  }
  let queue = [root];
  while (queue.length > 0) {
    let size = queue.length;
    console.log(queue);
    for (let i = 0; i < size; i++) {
      let firstElement = queue.pop();
      console.log(firstElement);
      if (i < size - 1) {
        firstElement.next = queue[queue.length - 1];
      }
      if (firstElement.left) {
        queue.unshift(firstElement.left);
      }
      if (firstElement.right) {
        queue.unshift(firstElement.right);
      }
    }
  }
  return root;

}

let root = new Node(1,
  new Node(2,
    new Node(4),
    new Node(5)
  ),
  new Node(3,
    new Node(6),
    new Node(7)
  )
);

connect(root);
/**
 * Validate Binary Search Tree
 * https://leetcode.com/problems/validate-binary-search-tree/
 */

function Node(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

/**
 * 通过递归实现
 * @param root
 * @param lower
 * @param greater
 * @return {boolean}
 */
function isValidBST(root, lower, greater) {
  if (root === null) {
    return true;
  }
  console.log(root.val, lower, greater);

  if (lower && lower >= root.val) {
    return false;
  }
  if (greater && greater <= root.val) {
    return false;
  }
  if (!isValidBST(root.left, lower, root.val)) {
    return false;
  }
  if (!isValidBST(root.right, root.val, greater)) {
    return false;
  }
  return true;
}

/**
 * 通过前序遍历实现,由于BST前序遍历都是有序的所以只要后一个元素比前一个元素小说明不是BST
 */
function InorderTraversal(root) {
  let stack = [], pre = -Number.MAX_VALUE;
  while (root || stack.length > 0) {
    while (root != null) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    if (root.val <= pre) return false;
    pre = root.val;
    root = root.right;
  }
  return true;
}

const tree = new Node(10,
  new Node(5, null, null),
  new Node(15,
    new Node(14, new Node(11), null),
    new Node(20, null, null)
  )
);
const tree2 = new Node(2,
  new Node(1, null, null),
  new Node(3, null, null)
);

console.log(InorderTraversal(tree2));
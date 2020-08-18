/**
 * Binary Tree Level Order Traversal
 * https://leetcode.com/problems/binary-tree-level-order-traversal/
 * @constructor
 */

const Node = require('./TreeNode');

function BinaryTreeLevelOrderTraversal(root) {
  if(root === null) {
    return [];
  }
  let arr = [];
  levelHeightHelper(arr, root, 0);
  return arr;
}

function levelHeightHelper(res, root, height) {
  if(root === null) return;
  if(!res[height]) res[height] = [];
  res[height].push(root.val);
  levelHeightHelper(res, root.left, height + 1);
  levelHeightHelper(res, root.right, height + 1);
}

const tree = new Node(10,
  new Node(5, null, null),
  new Node(15,
    new Node(14, new Node(11), null),
    new Node(20, null, null)
  )
);
console.log(BinaryTreeLevelOrderTraversal(tree));


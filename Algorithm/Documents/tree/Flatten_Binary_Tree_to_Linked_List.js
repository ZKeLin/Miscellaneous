/**
 * Flatten Binary Tree to Linked List
 * https://leetcode.com/problems/flatten-binary-tree-to-linked-list/
 */
const TreeNode = require('./TreeNode');


function flatten(root) {
  let prev = null;
  helper(root, prev);
  function helper(root) {
    if(root === null) return;
    helper(root.right);
    helper(root.left);
    root.right = prev;
    root.left = null;
    prev = root;
  }
}



let tree = new TreeNode(10,
  new TreeNode(5, null, null),
  new TreeNode(15,
    new TreeNode(14, new TreeNode(11), null),
    new TreeNode(20, null, null)
  )
);
let tree1 = new TreeNode(0, null, null);
flatten(tree);
console.log(tree);
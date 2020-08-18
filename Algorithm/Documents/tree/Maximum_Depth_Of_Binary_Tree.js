/**
 * Maximum Depth of Binary Tree
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/
 */
const Node = require('./TreeNode');


function maxDepth(root) {
  if(root === null) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

const tree = new Node(10,
  new Node(5, null, null),
  new Node(15,
    new Node(14, new Node(11), null),
    new Node(20, null, null)
  )
);

console.log(maxDepth(tree));
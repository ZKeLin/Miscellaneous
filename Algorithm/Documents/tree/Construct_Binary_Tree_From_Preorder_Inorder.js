/**
 *  Construct Binary Tree from Preorder and Inorder Traversal
 *  https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 * @constructor
 */
const TreeNode = require('./TreeNode');
function ConstructTree(preorder, inorder) {
  return ConstructTreeHelper(0,0, inorder.length - 1, preorder, inorder);
}

function ConstructTreeHelper(preStart, inStart, inEnd, preorder, inorder) {
  if(preStart > preorder.length - 1 || inStart > inEnd) return null;
  let root = new TreeNode(preorder[preStart]);
  let inIndex = 0;
  for (let i = inStart; i <= inEnd; i++) {
    if (root.val === inorder[i]) {
      inIndex = i;
    }
  }
  root.left = ConstructTreeHelper(preStart + 1, inStart, inIndex - 1, preorder, inorder);
  root.right = ConstructTreeHelper(preStart + inIndex - inStart + 1, inIndex + 1, inEnd, preorder, inorder);
  return root;

}

console.log(ConstructTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));
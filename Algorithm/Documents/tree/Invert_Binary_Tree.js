/**
 * Invert Binary Tree
 * https://leetcode.com/problems/invert-binary-tree/
 */
function invertTree(root) {
  if(root === null){
    return null;
  }
  let left = invertTree(root.left);
  let right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
}



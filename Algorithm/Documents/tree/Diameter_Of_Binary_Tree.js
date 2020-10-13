/**
 * 二叉树的直径
 * https://leetcode.com/problems/diameter-of-binary-tree/
 * depth first research
 */

const TreeNode = require('./TreeNode');

function diameterOfBinaryTree(root) {
  let ans = 1;
  depth(root);
  function depth(node) {
    if(node === null){
      return 0;
    }
    let L = depth(node.left);
    let R = depth(node.right);
    ans = Math.max(ans, L + R + 1);
    return Math.max(L, R) + 1;
  }
  return ans - 1;
}


let root = new TreeNode(1, new TreeNode(2, new TreeNode(3), null), new TreeNode(4, null, null));

console.log(diameterOfBinaryTree(root));

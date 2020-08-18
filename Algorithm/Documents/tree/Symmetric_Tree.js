/**
 * Symmetric Tree
 * 判断是不是对称树
 * https://leetcode.com/problems/symmetric-tree/
 */


function Node(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

function isSymmetric(root) {
  return isMirror(root, root);
}

function isMirror(t1, t2) {
  if(t1 === null && t2 === null) return true;
  if(t1 === null || t2 === null) return false;
  return t1.val === t2.val &&
    isMirror(t1.right, t2.left) &&
    isMirror(t2.right, t1.left);

}
/**
 * Kth Smallest Element in a BST
 * https://leetcode.com/problems/kth-smallest-element-in-a-bst/
 */

const TreeNode = require('./TreeNode');
function kthSmallestElement(root, k) {
  let sortedArr = getDFSArr(root, []);
  return sortedArr[k-1];
}

function getDFSArr(root, arr) {
  if(root === null){
    return arr;
  }
  getDFSArr(root.left, arr);
  arr.push(root.val);
  getDFSArr(root.right, arr);
  return arr;
}

let root = new TreeNode(3, new TreeNode(1, null, new TreeNode(2, null, null)), new TreeNode(4, null, null));
console.log(kthSmallestElement(root, 2));
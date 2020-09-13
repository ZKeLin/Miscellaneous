/**
 * Lowest Common Ancestor of a Binary Tree
 * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
 */
const TreeNode = require('./TreeNode');
function lowestCommonAncestor1(root, p, q) {
  let parentMap = new Map();
  let stack = [];

  parentMap.set(root, null);
  stack.push(root);
  while(!parentMap.has(p) || !parentMap.has(q)) {
    let node = stack.pop();

    if(node.left !== null){
      parentMap.set(node.left, node);
      stack.push(node.left);
    }
    if(node.right !== null) {
      parentMap.set(node.right, node);
      stack.push(node.right);
    }
  }
  let ancestors = new Set(); //存储p的所有祖先，直到p的祖先为null也就是遍历到root节点
  while(p !== null){
    ancestors.add(p);
    p = parentMap.get(p);
  }

  while(!ancestors.has(q)){ //在p的祖先中是否含有q的祖先，如果没有则q = q的祖先，直到p中包含q的祖先，即两个的最小共同祖先
    q = parentMap.get(q);
  }
  return q;
}

let p = new TreeNode(6, null);
let q = new TreeNode(2, new TreeNode(7,null, null), new TreeNode(4, null, null));

let root =  new TreeNode(3, new TreeNode(5, p, null), new TreeNode(1, q, null));

console.log(lowestCommonAncestor1(root, p, q));

/**
 * https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/
 */
const TreeNode = require('./TreeNode');

function levelOrderBottom(root) {
  if(!root) {
    return [];
  }
  let levelOrder = [];
  let queue = [ root ];
  while(queue.length > 0) {
    let levelSize = queue.length;
    let level = [];
    for (let i = 0; i < levelSize; i++) {
      let currentNode = queue.pop();
      if(currentNode) {
        level.push(currentNode.val);
        if(currentNode.left){
          queue.unshift(currentNode.left);
        }
        if(currentNode.right){
          queue.unshift(currentNode.right);
        }
      }
    }
    levelOrder.unshift(level);
  }
  return levelOrder;
}

const root = new TreeNode(3,
  new TreeNode(9, null, null),
  new TreeNode(20, new TreeNode(15, null, null), new TreeNode(7, null, null))
);

console.log(levelOrderBottom(root));
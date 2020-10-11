/**
 * Serialize and Deserialize Binary Tree
 * https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
 */
const TreeNode = require('./TreeNode');
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 */
const serialize = function(root) {
  let stack = [];
  let container = [];
  root && stack.push(root) && container.push(root.val);
  while(stack.length !== 0) {
    let node = stack.shift();
    if(node.left) {
      stack.push(node.left);
      container.push(node.left.val);
    }else{
      container.push('x');
    }
    if(node.right){
      stack.push(node.right);
      container.push(node.right.val);
    }else{
      container.push('x');
    }
  }
  return container.join(',');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 */
const deserialize = function(data) {
  let nodeList = data.split(',');
  if(nodeList.length === 0 || !data){
    return null;
  }
  let root = new TreeNode(nodeList[0]);
  let stack = [root];
  let i = 0;
  while(stack.length !== 0) {
    let node = stack.shift();
    let leftVal = nodeList[++i];
    if(leftVal === 'x'){
      node.left = null;
    }else{
      node.left = new TreeNode(leftVal);
      stack.push(node.left);
    }
    let rightVal = nodeList[++i];
    if(rightVal === 'x'){
      node.right = null;
    }else{
      node.right = new TreeNode(rightVal);
      stack.push(node.right);
    }
  }
  return root;
};

let root = new TreeNode(1, new TreeNode(2, null, null), new TreeNode(3, new TreeNode(4, null, null), new TreeNode(5, null, null)))
console.log(serialize(root));
// console.log(deserialize(''));


module.exports = {
  serialize,
  deserialize
};
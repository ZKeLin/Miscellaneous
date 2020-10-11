/**
 * path sum iii
 * https://leetcode.com/problems/path-sum-iii/
 * @param tree
 * @param sum
 */

const TreeNode = require('./TreeNode');
const { deserialize } = require('./Serialize_and_Deserialize_Binary_Tree');
function pathSum(root, sum) {
  if(root == null){
    return 0;
  }
  return pathSumFrom(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);
}

function pathSumFrom(node, sum) {
  if(node === null){
    return 0;
  }
  return (node.val === sum ? 1 : 0) + pathSumFrom(node.left, sum - node.val) + pathSumFrom(node.right, sum - node.val);
}

let root = new TreeNode(10,
  new TreeNode(5,
    new TreeNode(3,
      new TreeNode(3, null, null),
      new TreeNode(-2, null, null)
    ),
    new TreeNode(2, null, new TreeNode(1, null, null))
  ),
  new TreeNode(-3, null, new TreeNode(11, null, null))
);

console.log(pathSum(root, 8));
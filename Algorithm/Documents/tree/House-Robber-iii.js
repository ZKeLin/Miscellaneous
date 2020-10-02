/**
 * house-robber-iii
 * https://leetcode.com/problems/house-robber-iii/discuss/79330/Step-by-step-tackling-of-the-problem
 */

const TreeNode = require('./TreeNode');

function houseRobber(root) {
  let res = dfs(root);
  return Math.max(res[0], res[1]);
}

function dfs(root) {
  if(root === null){
    return [0,0];
  }
  let left = dfs(root.left);
  let right = dfs(root.right);
  console.log(left, right, root.val);
  let res = [0,0];
  res[0] = Math.max(left[0], left[1]) + Math.max(right[0], right[1]); // left[0], left[1] 代表的是啥？
  res[1] = root.val + left[0] + right[0];
  console.log(res);
  return res;
}


let root = new TreeNode(3, new TreeNode(2, null, new TreeNode(3, null, null)), new TreeNode(3, null, new TreeNode(1, null,null)));
houseRobber(root);
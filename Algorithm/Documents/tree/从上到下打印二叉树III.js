/**
 * 剑指 Offer 32 - III. 从上到下打印二叉树 III
 * https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/
 * @param {*} root 
 */
const TreeNode = require('./TreeNode');
function levelOrder(root) {
  if (!root) {
    return [];
  }
  let queue = [root];
  let currentLever = 0;
  let result = [];
  while (queue.length > 0) {
    let size = queue.length;
    let temp = [];
    for (let i = 0; i < size; i++) {
      let node = queue.pop();
      if (node) {
        if (currentLever % 2 === 0) {
          temp.push(node.val);
        } else {
          temp.unshift(node.val);
        }
        if (node.left) {
          queue.unshift(node.left);
        }
        if (node.right) {
          queue.unshift(node.right);
        }
      }
    }
    currentLever++;
    result.push(temp);
  }
  return result;
}

const root = new TreeNode(3,
  new TreeNode(9, null, null),
  new TreeNode(20, new TreeNode(15, null, null), new TreeNode(7, null, null))
);

console.log(levelOrder(root));
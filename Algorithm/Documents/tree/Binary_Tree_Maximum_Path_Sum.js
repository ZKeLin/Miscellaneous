/**
 * Binary Tree Maximum Path Sum
 * https://leetcode.com/problems/binary-tree-maximum-path-sum/
 * todo 未理解
 */
const TreeNode = require('./TreeNode');

function maxPathSum(root) {
  let maxValue = Number.MIN_SAFE_INTEGER;

  function maxPathSumHelper(root) {
    if (root === null) return 0;
    let left = Math.max(0, maxPathSumHelper(root.left));
    let right = Math.max(0, maxPathSumHelper(root.right));
    maxValue = Math.max(maxValue, left + right + root.val);
    return Math.max(left, right) + root.val;
  }

  maxPathSumHelper(root, maxValue);
  return maxValue;
}


let root = new TreeNode(-4,
  new TreeNode(4,
    new TreeNode(-2, null, null),
    new TreeNode(-3, null, null)
  ),
  new TreeNode(-5,
    null,
    new TreeNode(3,
      new TreeNode(1,
        new TreeNode(6, null, null),
        new TreeNode(7, null, null)
      ),
      new TreeNode(8,
        new TreeNode(9, null, null),
        new TreeNode(10, null, null)
      )
    )
  )
);

let root2 = new TreeNode(-10,
  new TreeNode(9, null, null),
  new TreeNode(20,
    new TreeNode(15, null, null),
    new TreeNode(7, null, null)
  )
);

console.log(maxPathSum(root2));

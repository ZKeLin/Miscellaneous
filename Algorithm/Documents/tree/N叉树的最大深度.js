/**
 * N叉树的最大深度
 * https://leetcode-cn.com/problems/maximum-depth-of-n-ary-tree/
 * @param root
 */

function Node(val, children) {
  this.val = val;
  this.children = children;
}

function maxDepth(root) {
  if (!root) {
    return 0;
  }
  let stack = [{ key: root, value: 1 }];
  let depth = 1;
  while (stack.length > 0) {
    let current = stack.shift();
    let node = current.key;
    let currentDepth = current.value;
    let children = node.children || [];
    depth = Math.max(depth, currentDepth);
    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      stack.push({ key: element, value: currentDepth + 1 });
    }
  }
  return depth;
}

const root = new Node(1, [
  new Node(2, [
    new Node(3, null),
    new Node(5, [
      new Node(6, null)
    ])
  ]),
  new Node(4, null)
]);

console.log(maxDepth(root));
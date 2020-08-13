

function inorderTraversal(root) {
  let stack = [], res = [];
  let current = root;
  while(current != null || stack.length !== 0) {
    while(current !== null) {
      stack.unshift(current);
      current = current.left;
    }
    current = stack.shift();
    res.push(current.value);
    current = current.right;
  }
  return res;
}

function Node(val, left, right) {
  this.value = (val===undefined ? 0 : val);
  this.left = (left===undefined ? null : left);
  this.right = (right===undefined ? null : right);
}

let root = new Node(
  1,
  new Node(
    2,
    new Node(3, null, new Node(4, null, null)),
    new Node(5, null, null)
  ),
  new Node(6, null)
);

console.log(inorderTraversal(root));
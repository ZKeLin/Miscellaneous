let { add, a, b, addB } = require('./commonjs');

console.log(a);
add();
console.log(a);

console.log(b);
addB();
console.log(b);

console.log(module)
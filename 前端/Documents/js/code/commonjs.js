let main = require('./main');
const a = {
  x: 5
};

exports.add = function () {
  return a.x++;
};

exports.a = a;

let b = 5;

exports.b = b;

exports.addB = function() {
  b++;
};
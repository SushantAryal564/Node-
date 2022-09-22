// console.log(arguments);
// console.log(require("module").wrapper);

const c = require("./../NodeBehindTheScence/requiring");

const { add, multiple, divide } = new c();
console.log(add(2, 5));
console.log(multiple(2, 8));

// exports
const cal2 = require("./module-text");
console.log(cal2.add(2, 5));
console.log(cal2.multiply(2, 8));

//Caching
require("./module-test")();
require("./module-test")();
require("./module-test")();

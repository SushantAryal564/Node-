// console.log(arguments);
// console.log(require("module").wrapper);
// module.export
const C = require("./NodeBehindThescence/requiring.js.js");
const calc1 = new C();
console.log(calc1.add(2, 5));
console.log(calc1.multiple(5, 6));
// exports
// const calc2 = require("./module-text.js");
const { add, multiple, divide } = require("./module-text");
console.log(add(2, 5));
console.log(multiple(2, 5));

// Caching
require("./module.test")();

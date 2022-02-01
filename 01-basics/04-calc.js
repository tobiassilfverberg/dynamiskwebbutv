/**
 * Calc stuff
 */

const geo = require("./modules/geometry");
const num = require("./modules/num");

// console.log("num", num);

let radius = 4;
let rounding = 3;

// let preciseRound = num.roundWithPrecision(radius, rounding);
// console.log(preciseRound);

let area = geo.area(radius);
console.log("the area is:", area);
let approxArea = num.roundWithPrecision(area, rounding);
console.log("approx. area is:", approxArea);
// let approxArea = Math.round(area * 10) / 10;
// console.log("the approx. area is:", approxArea);

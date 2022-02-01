/**
 * Calc stuff
 */

const geo = require("./modules/geometry");

// console.log("geo", geo);

let radius = 4;

let area = geo.area(radius);
let approxArea = Math.round(area * 10) / 10;
console.log("the area is:", area);
console.log("the approx. area is:", approxArea);

let circumference = geo.circumference(radius);
console.log("the circumference is:", circumference);

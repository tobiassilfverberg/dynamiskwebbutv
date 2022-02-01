/**
 * Do all things geometry-related
 */

const { PI } = Math;

// n^2
const area = (r) => PI * r ** 2;

// n * 2
const circumference = (r) => 2 * PI * r;

// Export all the stuff
module.exports = {
  area,
  circumference,
};

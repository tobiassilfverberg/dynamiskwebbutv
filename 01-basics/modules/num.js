const roundWith1Dec = (num) => Math.round(num * 10) / 10;
const roundWith2Dec = (num) => Math.round(num * 100) / 100;
// const roundWithPrecision = (num, precision) => num.toFixed(precision);
const roundWithPrecision = (num, precision) =>
  Math.round(num * 10 ** precision) / 10 ** precision;

module.exports = {
  roundWith1Dec,
  roundWith2Dec,
  roundWithPrecision,
};

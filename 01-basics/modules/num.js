const roundWith1Dec = (num) => (num * 10) / 10;
const roundWith2Dec = (num) => (num * 100) / 100;
const roundWith3Dec = (num) => (num * 1000) / 1000;

module.exports = {
  roundWith1Dec,
  roundWith2Dec,
  roundWith3Dec,
};

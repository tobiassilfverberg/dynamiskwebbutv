const bookshelf = require("./bookshelf");

const Reservations = bookshelf.Model.extend({
  tableName: "Reservations",
});

module.exports = Reservations;

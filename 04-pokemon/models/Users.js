const bookshelf = require("./bookshelf");
const reservations = require("./Reservations");

const Users = bookshelf.Model.extend({
  tableName: "Users",
  reservations() {
    return this.hasMany(reservations, "user").query({
      where: { status: "waiting" },
    });
  },
});

module.exports = Users;

const bookshelf = require("./bookshelf");
const titles = require("./Titles");

const Authors = bookshelf.Model.extend({
  tableName: "Authors",
  showAllTitles() {
    return this.hasMany(titles, "authorId");
  },
});

module.exports = Authors;

/**
 * Album model
 */

module.exports = (bookshelf) => {
  return bookshelf.model(
    "Album",
    {
      tableName: "albums",
      photos() {
        return this.belongsToMany("Photo");
      },
      users() {
        return this.belongsTo("User");
      },
    },
    {
      async fetchById(id) {
        const user = await new this({ id }).fetch({ require: false });
        if (!user) {
          return false;
        }
        return user;
      },
    }
  );
};

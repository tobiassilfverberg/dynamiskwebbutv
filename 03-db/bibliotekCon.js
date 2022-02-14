const Authors = require("./Authors");
const Titles = require("./Titles");

Authors.fetchAll().then((authors) => {
  console.log(authors.toJSON());
});

/* Titles.fetchAll().then((titles) => {
  console.log(titles.toJSON());
}); */

const Authors = require("./Authors");
const Titles = require("./Titles");

Authors.fetchAll().then((authors) => {
  console.log(authors.ToJSON);
});

Titles.fetchAll().then((titles) => {
  console.log(titles.ToJSON);
});

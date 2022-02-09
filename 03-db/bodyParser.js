const express = require("express");
const app = express();

app.use(express.static("static"));

app.get("/bodyParser", (req, res) => {
  console.log("Get /bodyParser");
  console.log(req.query); // Vid GET kommer data i query
  console.log("Name = " + req.query.name);
  console.log("Profile = " + req.query.profile);
  res.send("OK");
});

// const bodyParser = require("body-parser");
// const urlEncodedBodyParser = bodyParser.urlencoded({ extended: false });

app.post("/bodyParser", express.urlencoded({ extended: false }), (req, res) => {
  console.log(req.query); // Vid POST finns ingen data i query
  console.log(req.body); // Vid POST finns datan i body om man använder en bodyParser
  console.log("Name = " + req.body.name);
  console.log("Profile = " + req.body.profile);
  res.send("OK");
});

app.post("/bodyParser", express.json(), (req, res) => {
  console.log(req.query);
  console.log(req.body);

  res.send("OK");
});

app.listen(3000, () => {
  console.log("Server started att http://localhost:3000");
});

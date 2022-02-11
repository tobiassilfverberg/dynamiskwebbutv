const express = require("express");
const app = express();

app.use(express.static("static"));

app.listen(3000, () => {
  console.log("Server started att http://localhost:3000");
});

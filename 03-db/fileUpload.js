const express = require("express");
const app = express();
const multer = require("multer");
const morgan = require("morgan");

app.use(morgan("short"));
app.use(express.static("static"));
/* 
const urlencoded = express.urlencoded({ extended: false });
const jsonencoder = express.json();
app.use(urlencoded);
*/
const storageObject = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const strDate = new Date().valueOf().toString();
    cb(null, strDate + "-" + file.originalname);
  },
});

const multipartdataEncoder = multer({ storage: storageObject });

app.post("/upload", multipartdataEncoder.single("myFile"), (req, res) => {
  console.log(req.file);
  res.send(req.file);
});

app.listen(3000, () => {
  console.log("Server started att http://localhost:3000");
});

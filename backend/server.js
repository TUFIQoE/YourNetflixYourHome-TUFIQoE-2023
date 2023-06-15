const express = require("express");
const db = require('better-sqlite3')('./database.db', {fileMustExist: true});
const path = require("path");

const app = express();
const port = process.env.PORT || 5001;

// noinspection JSCheckFunctionSignatures
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", 1);
  next();
});

require(path.join(__dirname + "/routes/assessment"))(app, db);
require(path.join(__dirname + "/routes/connection_test"))(app);
require(path.join(__dirname + "/routes/experiment"))(app, db);
require(path.join(__dirname + "/routes/playback_data"))(app, db);
require(path.join(__dirname + "/routes/results"))(app, db);
require(path.join(__dirname + "/routes/video"))(app, db);

app.get("/", (req, res) => {
  res.send(`App listening on port ${port}`)
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

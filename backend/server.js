const fs = require('fs');
const https = require('https');
const express = require("express");
const db = require('better-sqlite3')('./database.db', {fileMustExist: true});
const links = require('better-sqlite3')('./links.db', {fileMustExist: true});
const path = require("path");

const app = express();
const port = process.env.PORT || 3568;

// Certificate
const privateKey = fs.readFileSync('/var/www/server-node-ynol/backend/badania-it.tele.agh.edu.pl/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/var/www/server-node-ynol/backend/badania-it.tele.agh.edu.pl/cert.pem', 'utf8');
const ca = fs.readFileSync('/var/www/server-node-ynol/backend/badania-it.tele.agh.edu.pl/chain.pem', 'utf8');

const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
};

// Starting https server
const httpsServer = https.createServer(credentials, app);

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
require(path.join(__dirname + "/routes/experiment"))(app, db, links);
require(path.join(__dirname + "/routes/id"))(app, db);
require(path.join(__dirname + "/routes/playback_data"))(app, db);
//require(path.join(__dirname + "/routes/results"))(app, db);
require(path.join(__dirname + "/routes/video"))(app, db);
require(path.join(__dirname + "/routes/link"))(app, db);

app.get("/", (req, res) => {
  res.send(`App listening on port ${port}`)
});

httpsServer.listen(port, () => {
        console.log(`HTTPS Server running on port ${port}`);
});

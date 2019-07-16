const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const bodyParser = require("body-parser");
const http = require("http");
const port = process.env.PORT || 3000;

const routes = require("./routes/index");

require("./dbconfig/connectDB");
require("./dbconfig/model");

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);

app.listen(port, function() {
  console.log("listening on 3000");
});

module.exports = app;

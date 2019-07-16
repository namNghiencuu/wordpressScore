var mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1/wordpressScore";
var db = mongoose.connection;
mongoose.connect(mongoDB, { useNewUrlParser: true });

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("db connected");
});

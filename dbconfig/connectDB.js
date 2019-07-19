var mongoose = require("mongoose");
var mongoDB = "mongodb://localhost:27017/wordpressscore";
var db = mongoose.connection;
mongoose.connect(mongoDB, { useNewUrlParser: true });

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("db connected");
});

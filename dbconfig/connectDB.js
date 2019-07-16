var mongoose = require("mongoose");
var mongoDB =
  "mongodb+srv://muahexanh:6w3plM31JlKJp6Di@muahexanh-vwmur.mongodb.net/muahexanh?retryWrites=true&w=majority";
var db = mongoose.connection;
mongoose.connect(mongoDB);

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("db connected");
});

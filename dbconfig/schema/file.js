var mongoose = require("mongoose");

var file = new mongoose.Schema({
  name: String,
  link: String,
  class: {
    type: Number,
    index: true
  }
});

module.exports = file;

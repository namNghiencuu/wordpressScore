var mongoose = require("mongoose");

module.exports = {
  todoList: mongoose.model("student", require("./schema/student")),
  file: mongoose.model("file", require("./schema/file"))
};

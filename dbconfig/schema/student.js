var mongoose = require("mongoose");

var student = new mongoose.Schema({
  numberId: Number,
  name: String,
  phoneNumber: String,
  studentId: {
    type: String,
    index: true
  },
  school: String,
  day1: Boolean,
  day2: Boolean,
  day3: Boolean,
  progressScore: Number,
  practiceScore: Number,
  totalScore: Number,
  attendance: Number,
  result: Boolean,
  class: {
    type: Number,
    index: true
  }
});

module.exports = student;

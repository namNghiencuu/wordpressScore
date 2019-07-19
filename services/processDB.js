const mongoose = require("mongoose");

var compareAndUpdateDB = async function(workbook, studentInDB) {
  var numberOfCreatedStudent = (numberOfUpdatedStudent = 0);
  await Promise.all(
    workbook.map(async (content, index) => {
      let found = await studentInDB.find(function(student) {
        return student.studentId.valueOf() === content.studentId.valueOf();
      });
      if (!found) {
        await mongoose.model("student").create(value, (err, result) => {
          if (err) throw err;
          numberOfCreatedStudent++;
        });
      } else {
        try {
          await found.updateOne(
            {
              $set: {
                day1: content.day1,
                day2: content.day2,
                day3: content.day3,
                progressScore: content.progressScore,
                practiceScore: content.practiceScore,
                totalScore: content.totalScore,
                attendance: content.attendance,
                result: content.result
              }
            },
            (err, result) => {
              if (err) throw err;
              numberOfUpdatedStudent++;
            }
          );
        } catch (error) {
          console.log("error when update at index: " + index);
          return res.send(error);
        }
      }
    })
  );
  return { created: numberOfCreatedStudent, updated: numberOfUpdatedStudent };
};
var compareAndReplaceDB = async function(workbook, studentInDB) {
  var numberOfCreatedStudent = (numberOfUpdatedStudent = 0);
  await Promise.all(
    workbook.map(async (content, index) => {
      let found = await studentInDB.find(function(student) {
        return student.studentId.valueOf() === content.studentId.valueOf();
      });
      if (!found) {
        await mongoose.model("student").create(value, (err, result) => {
          if (err) throw err;
          numberOfCreatedStudent++;
        });
      } else {
        try {
          await found.updateOne(
            {
              $set: {
                day1: content.day1,
                day2: content.day2,
                day3: content.day3,
                progressScore: content.progressScore,
                practiceScore: content.practiceScore,
                totalScore: content.totalScore,
                attendance: content.attendance,
                result: content.result
              }
            },
            (err, result) => {
              if (err) throw err;
              numberOfUpdatedStudent++;
            }
          );
        } catch (error) {
          console.log("error when update at index: " + index);
          return res.send(error);
        }
      }
    })
  );
  return { created: numberOfCreatedStudent, updated: numberOfUpdatedStudent };
};
module.exports = {
  compareAndUpdateDB,
  compareAndReplaceDB
};

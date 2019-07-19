const express = require("express");
const router = express.Router();
const { readExcel } = require("../public/script/readExcel");

const mongoose = require("mongoose");
const {
  uploadFile,
  getLink,
  saveFileInformation
} = require("../services/uploadFile");

router.get("/update", (req, res, next) => {
  return res.render("uploadFile", { update: 0, create: 0 });
});
router.post(
  "/update",
  uploadFile("excelFile").single("file"),
  async (req, res, next) => {
    try {
      var file = await saveFileInformation({
        file: req.file,
        link: getLink(req.file),
        class: req.body.class
      });
      try {
        var existStudentPromise = mongoose
          .model("student")
          .find({ class: req.body.class })
          .exec();
        var [existStudent, workbookContent] = await Promise.all([
          existStudentPromise,
          readExcel(file)
        ]);
        if (existStudent.length == 0) {
          try {
            await mongoose
              .model("student")
              .create(workbookContent, (err, result) => {
                return res.render("uploadFile", {
                  update: 0,
                  create: result.length
                });
              });
          } catch (error) {
            console.log("create student in db error" + error);
            return res.send("create student in db error" + error);
          }
        } else {
          var create = (update = 0);
          let result = await Promise.all(
            workbookContent.map(async (content, index) => {
              let found = await existStudent.find(function(student) {
                return (
                  student.studentId.valueOf() === content.studentId.valueOf()
                );
              });
              if (!found) {
                await mongoose.model("student").create(value, (err, result) => {
                  if (err) throw err;
                  create++;
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
                      update++;
                    }
                  );
                } catch (error) {
                  console.log("error when update at index: " + index);
                  return res.send(error);
                }
              }
            })
          );
          console.log("update: " + update);
          console.log("create: " + create);
          return res.render("uploadFile", { update: update, create: create });
        }
      } catch (error) {
        console.log(
          "error when find student in db or reading workbookContent " +
            " : " +
            error
        );
        return res.send(error);
      }
    } catch (error) {
      console.log("problem uploading file" + error);
      return res.send(error);
    }
  }
);

router.get("/", (req, res, next) => {
  return res.render("view");
});

router.post("/getscore", async (req, res, next) => {
  var query = {};
  if (req.body.choice == "ID") {
    query = {
      studentId: req.body.queryString
    };
  } else if (req.body.choice == "NAME") {
    query = {
      name: {
        $regex: ".*" + req.body.queryString.toUpperCase() + ".*"
      }
    };
  }

  await mongoose.model("student").find(query, (err, result) => {
    if (err) throw err;
    console.log("run");
    return res.render("view", { students: result });
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { readExcel } = require("../public/script/readExcel");
const { compareAndUpdateDB } = require("../services/processDB");

const mongoose = require("mongoose");
const {
  uploadFile,
  getLink,
  saveFileInformation
} = require("../services/uploadFile");

router.get("/uploadFile", (req, res, next) => {
  return res.render("uploadFile");
});
router.post(
  "/update",
  uploadFile("excelFile").single("file"),
  async (req, res, next) => {
    try {
      var savedFileInformation = await saveFileInformation({
        file: req.file,
        link: getLink(req.file),
        class: req.body.class
      });
      try {
        var existStudentPromise = mongoose
          .model("student")
          .find({ class: req.body.class })
          .exec();
        var [existStudentInDB, workbookContent] = await Promise.all([
          existStudentPromise,
          readExcel(savedFileInformation)
        ]);
        // Create student
        if (existStudentInDB.length == 0) {
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
          let result = compareAndUpdateDB(workbookContent, existStudentInDB);

          console.log("update: " + result.updated);
          console.log("create: " + result.created);
          return res.render("uploadFile", result);
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
router.get("/delete", (req, res, next) => {
  return res.render("delete");
});
router.post("/delete", (req, res, next) => {
  try {
    console.log(req.body.class);
    var existStudent = mongoose
      .model("student")
      .deleteMany({ class: req.body.class })
      .exec(err => {
        if (err) throw err;
        console.log("remove all");
        return res.render("delete", {
          msg: "remove all student of class " + req.body.class
        });
      });
  } catch (error) {
    console.log("error when remove student in db" + " : " + error);
    return res.status(500).send(error);
  }
});

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

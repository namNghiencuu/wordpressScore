var multer = require("multer");
var randomString = require("randomstring");
var mongoose = require("mongoose");

module.exports = {
  uploadFile: type => {
    var placeStore = `${type}`;
    let storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "public/" + placeStore);
      },
      filename: (req, file, cb) => {
        let fileName = file.originalname.split(".");
        let newFileName = `${randomString.generate(
          10
        )}-${new Date().getTime()}`;
        console.log(newFileName);
        cb(null, `${newFileName}.${fileName[fileName.length - 1]}`);
      }
    });
    return multer({ storage: storage });
  },
  getLink: file => {
    const length = file.filename.split(".");
    const fileId = file.filename.split(".")[0];
    const endFile = file.filename.split(".")[length.length - 1];
    // Remove public in destination and add filename in the link
    let fileLink = file.destination + "/" + file.filename;
    return fileLink;
  },
  saveFileInformation: params => {
    return new Promise((resolve, reject) => {
      let content = {
        name: params.file.filename,
        link: params.link,
        class: params.class
      };
      mongoose.model("file").create(content, (err, result) => {
        if (err) reject(err);
        console.log(result);
        resolve(result);
      });
    });
  }
};

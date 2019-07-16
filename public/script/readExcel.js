const Excel = require("exceljs");
const fs = require("fs");
const { processContent } = require("./processContent");

module.exports = {
  readExcel: file => {
    return new Promise((resolve, reject) => {
      try {
        var workbook = new Excel.Workbook();
        var content = [];
        var flag = 0;
        workbook.xlsx.readFile(file.link).then(async function() {
          var worksheet = workbook.getWorksheet("Sheet1");
          worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
            if (flag == 0) {
              if (row.getCell(1).value != null) {
                if (row.getCell(1).value.toUpperCase() === "STT") {
                  flag = 1;
                }
              }
            } else if (flag == 1) {
              if (row.getCell(2).value.toUpperCase() == "NGƯỜI LẬP BẢNG") {
                flag = 0;
              } else content.push(row.values);
            }
          });
          content = await processContent({
            content: content,
            class: file.class
          });
          resolve(content);
        });
      } catch (error) {
        console.log("reading excel error: " + error);
        reject(error);
      }
    });
  }
};

module.exports = {
  processContent: params => {
    return new Promise((resolve, reject) => {
      try {
        let newContent = params.content.map((value, index) => {
          let returnObject = {};
          returnObject.numberId = !value[1] ? index : value[1];
          returnObject.class = params.class;
          returnObject.name = !value[2] ? "" : value[2].toUpperCase();
          returnObject.phoneNumber = !value[3] ? "" : value[3];
          returnObject.studentId = !value[4] ? "" : value[4].toString();
          returnObject.school = !value[5] ? "" : value[5].toUpperCase();
          returnObject.day1 = !value[6] ? false : true;
          returnObject.day2 = !value[7] ? false : true;
          returnObject.day3 = !value[8] ? false : true;
          returnObject.progressScore = !value[9] ? 0 : value[9];
          returnObject.practiceScore = !value[10] ? 0 : value[10];
          returnObject.totalScore =
            returnObject.practiceScore * 0.6 + returnObject.progressScore * 0.4;
          returnObject.attendance = value
            .slice(6, 9)
            .reduce((accumulator, item) => {
              if (item.toUpperCase() === "X") accumulator++;
              return accumulator;
            }, 0);
          if (returnObject.totalScore < 5) returnObject.result = false;
          else returnObject.result = true;
          return returnObject;
        });
        console.log("run");
        resolve(newContent);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
};

const fs = require("fs");

const saveToDatabase = (DB) => {
  try {
    fs.writeFileSync("./src/db/correccions.json", JSON.stringify(DB, null, 2), {
      encoding: "utf8",
    });
  } catch (error) {
    console.log(error);
  }

};

module.exports = { saveToDatabase };
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("./../../models/tourModel");
dotenv.config({ path: `${__dirname}/../../config.env` });
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log("DB connection successful.");
});

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync("./tours-simple.json", "utf-8"));
// Import data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded.");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted.");
    process.exit(); // aggressive way of stoping an application.
  } catch (err) {
    console.log(err);
  }
};
console.log(process.argv[2]);
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
// console.log(process.argv);

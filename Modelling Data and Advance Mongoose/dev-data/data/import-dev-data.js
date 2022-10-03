const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Review = require("./../../models/reviewModel");
dotenv.config({ path: `${__dirname}/../../config.env` });
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log("DB connection successful.");
});

// READ JSON FILE
const reviews = JSON.parse(fs.readFileSync("./reviews.json", "utf-8"));
// Import data into DB
const importData = async () => {
  try {
    await Review.create(reviews);
    console.log("Data successfully loaded.");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Review.deleteMany();
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

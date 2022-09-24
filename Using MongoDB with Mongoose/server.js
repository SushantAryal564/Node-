const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./app");
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log("DB connection successfull.");
});

console.log(process.env.DATABASE_LOCAL);
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`You are currently listening to port ${port}`);
});

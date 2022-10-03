const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./app");
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => {})
  .catch(() => console.log("Error"));

console.log(process.env.DATABASE_LOCAL);
const port = 3000;
const server = app.listen(port, () => {
  console.log(`You are currently listening to port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

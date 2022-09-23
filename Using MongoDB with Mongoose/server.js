const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./app");
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log("DB connection successfull.");
});
const tourSchema = new mongoose.Schema({
  name: {
    // Schema type option
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});
const Tour = mongoose.model("Tour", tourSchema);

console.log(process.env.DATABASE_LOCAL);
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`You are currently listening to port ${port}`);
});

import Tour from "./tourModel";
/// Review/ rating/ createdAt/ ref to the tour / ref to user
const mongoose = require("mongoose");
reviewSchema = new mongoose.Schema({
  review: {
    type: String,
  },
  rating: Number,
  cratedAt: Date,
  tours: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "tours",
    },
  ],
  users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
  ],
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "tours",
    select: "Tour",
  });
  this.populate({
    path: "users",
    select: "User",
  });
});

Review = mongoose.model("Review", reviewSchema);
module.exports = Review;

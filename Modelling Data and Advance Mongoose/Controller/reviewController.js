const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const Review = require("./../models/reviewModel");

exports.getAllReview = catchAsync(async (req, res) => {
  const review = await Review.find();
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: review.length,
    data: {
      review,
    },
  });
});

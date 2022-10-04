const express = require("express");
const router = express.Router();
const reviewController = require("./../Controller/reviewController");
const authController = require("./../Controller/authController");
router
  .route("/")
  .get(reviewController.getAllReview)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.createReview
  );
module.exports = router;

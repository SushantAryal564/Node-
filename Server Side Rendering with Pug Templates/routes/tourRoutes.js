const express = require("express");

const tourController = require("./../Controller/tourController");
const authController = require("./../Controller/authController");
const reviewRouter = require("./reviewRoutes");

const router = express.Router();

// Create a checkBody middleware
// Check if body contain the name and price property
// If not, send back 400 (bad request)
// Add it to  the post handler stack.
router.route("/tour-stats").get(tourController.getTourStats);

router
  .route("/monthly-plan/:year")
  .get(
    authController.protect,
    authController.restrictTo("admin", "lead-guide", "guide"),
    tourController.getMonthlyPlan
  );
router
  .route("/top-5-cheap")
  .get(tourController.aliasTopTours, tourController.getAllTours);
router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(tourController.getTourWithin);
// torus-within?distance=233&center=-40,45&units=mi
// /tours-/233/center/-4045/unit/mi

router.route("/distances/:latlng/unit/:unit").get(tourController.getDistances);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.createTour
  );
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );
// POST/tour/234fad4/revies
// GET /tour/asldjfa/reviews
// GET/ tour/asdfsadf/reviews/984667

// Without Merge
// router
//   .route("/:tourId/reviews")
//   .post(
//     authController.protect,
//     authController.restrictTo("user"),
//     reviewController.createReview
//   );
// With Merger params
router.use("/:tourId/reviews", reviewRouter);
module.exports = router;

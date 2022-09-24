const express = require("express");
const router = express.Router();
const tourController = require("./../Controller/tourController");
// Create a checkBody middleware
// Check if body contain the name and price property
// If not, send back 400 (bad request)
// Add it to  the post handler stack.
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
module.exports = router;

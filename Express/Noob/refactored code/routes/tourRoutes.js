const express = require('express');
const router = express.Router();
const {
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTourparam,
  checkID,
  checkBody,
} = require('./../controller/tourController');
router.param('id', checkID);
router.route('/').get(getTour).post(checkBody, createTour);
router.route('/:id').patch(updateTour).delete(deleteTour);
router.route('/:id/:y?').get(getTourparam);

module.exports = router;

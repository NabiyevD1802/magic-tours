const express = require('express');
const { reset } = require('nodemon');
const tourController = require('../controller/tourController');

const tourRouter = express.Router();

tourRouter.use(
  '/the-best-3-tours',
  (req, res, next) => {
    req.query.sort = '-price';
    req.query.limit = 3;
    next();
  },
  tourController.getAllTours
);

tourRouter.route('/stats').get(tourController.tourStats);
tourRouter.route('/report/:year').get(tourController.tourReportYear);
tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.addTours);
tourRouter
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;

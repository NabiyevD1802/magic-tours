const Tour = require('./../model/tourModel');
const FeatureAPI = require('./../utility/FeatureAPI');
const getAllTours = async (req, res) => {
  try {
    const query = new FeatureAPI(req.query, Tour)
      .filter()
      .sorting()
      .field()
      .pagenation();

    const tours = await query.databaseQuery;
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      status: 'FAIL',
      message: err.message,
    });
  }
};

const addTours = async (req, res) => {
  try {
    const data = req.body;
    const tour = await Tour.create(data);

    res.status(201).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      status: 'FAIL',
      message: err.message,
    });
  }
};

const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      status: 'FAIL',
      message: err.message,
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      status: 'FAIL',
      message: err.message,
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.status(404).json({
      status: 'FAIL',
      message: err.message,
    });
  }
};

const tourStats = async (req, res) => {
  try {
    const data = await Tour.aggregate([
      { $match: { duration: { $gte: 0 } } },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numberTours: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
        },
      },
      {
        $sort: {
          avgPrice: 1,
        },
      },
      {
        $project: { _id: 0 },
      },
    ]);
    res.status(200).json({
      status: 'success',
      result: data.length,
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      status: 'FAIL',
    });
  }
};

const tourReportYear = async (req, res) => {
  try {
    const data = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${req.params.year}-01-01`),
            $lte: new Date(`${req.params.year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          countTours: { $sum: 1 },
          nameTours: { $push: '$name' },
        },
      },
      { $addFields: { monthRate: '$_id' } },
      { $project: { _id: 0 } },
      { $sort: { countTours: 1 } },
      { $limit: 2 },
    ]);
    res.status(200).json({
      status: 'success',
      result: data.length,
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      status: 'FAIL',
      message: err.message,
    });
  }
};

module.exports = {
  getAllTours,
  addTours,
  updateTour,
  getTourById,
  deleteTour,
  tourStats,
  tourReportYear,
};

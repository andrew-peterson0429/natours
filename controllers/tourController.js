const Tour = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
  try {
    console.log("this is req.query: ", req.query);
    // BUILD QUERY
    // 1A) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // { difficulty: 'easy', duration: {$gte: 5} } this is queryStr
    // gte, gt, lte, lt These are filter operators

    const query = await Tour.find(JSON.parse(queryStr));

    // // 2) Sorting Gave up and just going to use + instead of , in url parameters
    // if (req.query.sort) {
    //   // const sortBy = req.query.sort.split(",").join(" ");
    //   // console.log("this is sortBy: ", sortBy);
    //   // console.log("this is sortBy type: ", typeof sortBy);
    //   // query = query.sort(sortBy); // this is the troubled sort method TypeError: The comparison function must be either a function or undefined
    //   // sort('price ratingsAverage')
    // } else {
    //   // default sort of createdAt property in desceding order
    //   query = query.sort("-createdAt");
    // }

    // EXECUTE QUERY
    const tours = await query;

    // const query = await Tour.find()
    //   .where("duration")
    //   .equals(5)
    //   .where("difficulty")
    //   .equals("easy");

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
    console.error("There was an error: ", err);
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id }) this is the same

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
    console.error("There was an error: ", err);
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
    console.error("There was an error: ", err);
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
    console.error("There was an error: ", err);
  }
};

exports.deleteTour = async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id);
  try {
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
    console.error("There was an error: ", err);
  }
};

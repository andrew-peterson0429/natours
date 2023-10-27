const Review = require("../models/reviewModel");
// const APIfeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Getting all reviews endpoint
exports.getAllReviews = catchAsync(async (req, res, next) => {
  //   const features = new APIfeatures(Review.find(), req.query)
  //     .filter()
  //     .sort()
  //     .limitFields()
  //     .paginate();

  //   const reviews = await features.query;

  //   // SEND RESPONSE
  //   res.status(200).json({
  //     status: "success",
  //     requestedAt: req.requestTime,
  //     results: reviews.length,
  //     data: {
  //       reviews,
  //     },
  //   });

  const reviews = await Review.find();

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });

  next();
});

// Get review endpoint
exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError("No review found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      review,
    },
  });
});

// Creating new review endpoint
exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
  next();
});
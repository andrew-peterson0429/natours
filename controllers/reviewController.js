const Review = require("../models/reviewModel");
// const APIfeatures = require("../utils/apiFeatures");
// const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

// Getting all reviews endpoint
// exports.getAllReviews = catchAsync(async (req, res, next) => {
//   //   const features = new APIfeatures(Review.find(), req.query)
//   //     .filter()
//   //     .sort()
//   //     .limitFields()
//   //     .paginate();

//   //   const reviews = await features.query;

//   //   // SEND RESPONSE
//   //   res.status(200).json({
//   //     status: "success",
//   //     requestedAt: req.requestTime,
//   //     results: reviews.length,
//   //     data: {
//   //       reviews,
//   //     },
//   //   });

//   let filter = {};
//   if (req.params.tourId) filter = { tour: req.params.tourId };

//   const reviews = await Review.find(filter);

//   res.status(200).json({
//     status: "success",
//     results: reviews.length,
//     data: {
//       reviews,
//     },
//   });

//   next();
// });

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

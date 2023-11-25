const mongoose = require("mongoose");
const Tour = require("./tourModel");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "A review cannot be empty!"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "A review must belong to a tour."],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A review must belong to a user."],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Pre-find middleware
reviewSchema.pre(/^find/, function (next) {
  // Commented out because there are too many populates happening when getting tour reviews.
  // this.populate({
  //   path: "tour",
  //   select: "name",
  // }).populate({
  //   path: "user",
  //   select: "name photo",
  // });

  this.populate({
    path: "user",
    select: "name photo",
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: "$tour",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  // console.log("this is stats: ", stats);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post("save", function (next) {
  // The this keyword points to current review
  this.constructor.calcAverageRatings(this.tour);
});

// findOneAndUpdate and findOneAndDelete
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.review = await this.findOne();
  // console.log("This is review in query: ", this.review);
  next();
});

// After query is finished and review updated, can calcAvgRatings
reviewSchema.post(/^findOneAnd/, async function () {
  // await this.findOne() does NOT work here, because the query is already executed
  await this.review.constructor.calcAverageRatings(this.review.tour);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

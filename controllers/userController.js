const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

// rest parameters for all allowedFields creating an array of all arguments
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  // Loop through obj and each element check if it's an allowed field, adding to newObj if it is.
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  }); // This returns an array of all the field names of this obj
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log("This is req.file: ", req.file);
  console.log("This is req.body: ", req.body);
  // 1) Create an error if user tries to update password by POSTing the data
  if (req.body.password || req.body.passwordConfirm) {
    return new AppError(
      "This route is not for password updates. Please use route: /updateMyPassword",
      400
    );
  }

  // 2) Filtered out unwanted field names that are not allowed to be updated.
  const filteredBody = filterObj(req.body, "name", "email");
  // 3) Update the user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined! Please use /signup instead."
  });
};

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

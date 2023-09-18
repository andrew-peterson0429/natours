const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    maxLength: [40, "A name must less or equal to 40 characters"],
  },
  email: {
    type: String,
    required: [true, "A user must have a email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "A user must have a password"],
    maxLength: [40, "A password must be less or equal to 40 characters"],
    minlength: [8, "A password must have more or equal to 8 characters"],
  },
  passwordConfirm: {
    type: String,
    require: [true, "Please confirm your password"],
    validate: {
      // This only works on SAVE!!!
      validator: function (el) {
        return el === this.password; // returns if pass is same, else false
      },
      message: "Passwords are not the same!",
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

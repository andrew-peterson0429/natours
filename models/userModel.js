const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    maxLength: [40, "A name must less or equal to 40 characters"]
  },
  email: {
    type: String,
    required: [true, "A user must have a email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  photo: {
    type: String,
    default: "default.jpg"
  },
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user"
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    maxLength: [40, "A password must be less or equal to 40 characters"],
    minlength: [8, "A password must have more or equal to 8 characters"],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on SAVE!!!
      validator: function(el) {
        return el === this.password; // returns if pass is same, else false
      },
      message: "Passwords are not the same!"
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

userSchema.pre("save", async function(next) {
  // Only run this function if password was actually modifed
  if (!this.isModified("password")) return;

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the passwordConfirm field. After validation is successful, no long need this field.
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function(
  canidatePassword,
  userPassword
) {
  return await bcrypt.compare(canidatePassword, userPassword);
};

userSchema.pre(/^find/, function(next) {
  // this point to current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.changedPasswordAfter = function(JWTtimestamp) {
  // Check to see if password has been changed
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    console.log(
      "this is changedTimestamp and JWTtimestamp: ",
      changedTimestamp,
      JWTtimestamp
    );

    return JWTtimestamp < changedTimestamp; // ex: the token was issued at time 100, but then the pass was changed at time 200. Means that the password was changed after token was issued.
  }

  // False means password has not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  console.log("This is reset token as an object: ", { resetToken });
  console.log("This is this.passwordResetToken: ", this.passwordResetToken);

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

// Commit for commit sake!

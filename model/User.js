var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");

var userSchema = new Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    age: { type: Number },
    phone: { type: Number },
    country: { type: String },
    github: {
      name: String,
      username: String,
      image: String,
    },
    google: {
      name: String,
      image: String,
    },
    providers: [String],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.password) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) return next(err);
      this.password = hashed;
      return next();
    });
  } else {
    return next();
  }
});

userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    return cb(err, result);
  });
};

module.exports = mongoose.model("User", userSchema);

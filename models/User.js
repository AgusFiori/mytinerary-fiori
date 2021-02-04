const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  urlPic: { type: String, required: true },
  country: String,
  role: { type: String, default: "user" },
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("user", userSchema);

module.exports = User;

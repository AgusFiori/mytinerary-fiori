const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  country: { type: String, default: "Argentina" },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  urlPic: {
    type: String,
    default:
      "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
  },
  role: { type: String, default: "user" },
  date: { type: Date, default: Date.now },
  loggedWithGoogle: { type: Boolean, default: false },
});

const User = mongoose.model("user", userSchema);

module.exports = User;

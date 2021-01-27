const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  cityId: { type: ObjectId, required: true },
  title: { type: String, required: true },
  authorPic: { type: String, required: false },
  authorName: { type: String, required: false },
  likes: { type: Number, required: false },
  duration: { type: Number, required: true },
  budget: { type: Number, required: true },
  hashtags: {
    type: Array,
    required: false,
    default: ["Travel", "Discover", "Relax"],
  },
  date: { type: Date, required: false, default: Date.now },
  accesibility: { type: Boolean, required: true },
  activities: [
    { img: { type: String, required: true } },
    { activity: { type: String, required: true } },
  ],
  comments: [
    {
      avatar: {
        type: String,
        required: false,
        default: "./images/user-icon-male.jpg",
      },
    },
    { username: { type: String, required: true } },
    { comment: { type: String, required: true } },
    { date: { type: String, required: false, default: Date.now } },
  ],
});

const Itinerary = mongoose.model("itinerary", itinerarySchema);

module.exports = Itinerary;

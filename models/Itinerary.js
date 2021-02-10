const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    cityId: { type: mongoose.Schema.ObjectId, ref: "city", required: true },
    title: { type: String, required: true },
    authorPic: { type: String, required: false },
    authorName: { type: String, required: false },
    likes: { type: Array, default: [] },
    duration: { type: Number, required: true },
    budget: { type: Number, required: true },
    hashtags: {
      type: Array,
      required: false,
      default: ["Travel", "Discover", "Relax"],
    },
    date: { type: Date, default: Date.now() },
    accesibility: { type: Boolean, required: true },
    activities: [{ img: String, activity: String }],
    comments: [{ avatar: String, username: String, comment: String }],
  },
  { timestamps: true }
);

const Itinerary = mongoose.model("itinerary", itinerarySchema);

module.exports = Itinerary;

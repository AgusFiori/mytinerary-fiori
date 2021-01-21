const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  cityName: { type: String, required: true },
  cityPic: { type: String, required: true },
  country: { type: String, required: true },
  facts: { type: Array, required: false, default: ["Find out !"] },
  flagUrl: { type: String, required: true },
});

const City = mongoose.model("city", citySchema);

module.exports = City;

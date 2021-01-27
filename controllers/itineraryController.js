const Itinerary = require("../models/Itinerary");

const itineraryController = {
  addItinerary: (req, res) => {
    // añadir itinerario
    const {
      cityId,
      title,
      authorPic,
      authorName,
      likes,
      duration,
      budget,
      hashtags,
      date,
      accesibility,
      activities,
      comments,
    } = req.body;
    const newItinerary = new Itinerary({
      cityId: cityId,
      title: title,
      authorPic: authorPic,
      authorName: authorName,
      likes: likes,
      duration: duration,
      budget: budget,
      hashtags: hashtags,
      date: date,
      accesibility: accesibility,
      activities: activities,
      comments: comments,
    });
    newItinerary
      .save()
      .then((newItinerary) => {
        return res.json({ success: true, respuesta: newItinerary });
      })
      .catch((error) => {
        return res.json({ success: false, error: error });
      });
  },
};

module.exports = itineraryController;

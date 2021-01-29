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
    });
    newItinerary
      .save()
      .then(async (newItinerary) => {
        const populatedItinerary = await newItinerary
          .populate("cityId")
          .execPopulate();
        res.json({ success: true, respuesta: populatedItinerary });
      })
      .catch((error) => {
        res.json({ success: false, error: error });
      });
  },
  allItineraries: async (req, res) => {
    try {
      const data = await Itinerary.find().populate("cityId");
      res.json({
        success: true,
        respuesta: data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  findItineraryById: async (req, res) => {
    try {
      const { id } = req.params;
      Itinerary.find({ cityId: id })
        .populate("cityId")
        .then((city) =>
          res.json({
            success: true,
            respuesta: city,
          })
        );
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = itineraryController;

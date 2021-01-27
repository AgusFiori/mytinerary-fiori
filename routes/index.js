const express = require("express");
const router = express.Router();
const cityController = require("../controllers/cityController");
const itineraryController = require("../controllers/itineraryController");

// rutas
router
  .route("/cities")
  .get(cityController.allCities)
  .post(cityController.addCity);

router
  .route("/city/:id")
  .get(cityController.singleCity)
  .post(itineraryController.addItinerary);

module.exports = router;

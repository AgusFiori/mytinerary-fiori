const express = require("express");
const router = express.Router();
const cityController = require("../controllers/cityController");
const itineraryController = require("../controllers/itineraryController");

// rutas
router
  .route("/cities")
  .get(cityController.allCities) // obtengo todas las ciudades
  .post(cityController.addCity); // agrego una ciudad

router.route("/city/:id").get(cityController.singleCity); // obtengo una ciudad en particular

router
  .route("/itineraries")
  .get(itineraryController.allItineraries) // obtengo todos los itinerarios
  .post(itineraryController.addItinerary); // agrego un itinerario

router.route("/itineraries/:id").get(itineraryController.findItineraryById);

module.exports = router;

const express = require("express");
const router = express.Router();
const cityController = require("../controllers/cityController");

// rutas
router
  .route("/cities")
  .get(cityController.allCities)
  .post(cityController.addCity);

router.route("/city/:id").get(cityController.singleCity);

module.exports = router;

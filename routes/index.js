const express = require("express");
const router = express.Router();
const cityController = require("../controllers/cityController");
const itineraryController = require("../controllers/itineraryController");
const userController = require("../controllers/userController");
const validator = require("../controllers/validator");
const passport = require("passport");
require("../config/passport");

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

router.route("/itineraries/:id").get(itineraryController.findItineraryById); // encuentro itinerarios de una ciudad

router
  .route("/register")
  .post(validator.newUserValidation, userController.register); // registrar un nuevo usuario, validado 1ro x JOI

router.route("/login").post(userController.login); // loguear un usuario

router
  .route("/itinerary/:id")
  .post(
    passport.authenticate("jwt", { session: false }),
    userController.postComment
  );

router
  .route("/itinerary/:itineraryId/:commentId")
  .delete(
    passport.authenticate("jwt", { session: false }),
    userController.deleteComment
  );

router
  .route("/itinerary/like/:id")
  .post(
    passport.authenticate("jwt", { session: false }),
    userController.likeComment
  );

router
  .route("/itinerary/dislike/:id")
  .post(
    passport.authenticate("jwt", { session: false }),
    userController.dislikeComment
  );

router
  .route("/localstorage")
  .post(
    passport.authenticate("jwt", { session: false }),
    userController.logFromLS
  );

module.exports = router;

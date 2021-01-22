const City = require("../models/City");

const cityController = {
  addCity: (req, res) => {
    // añadir ciudad
    const { cityName, cityPic, country, facts, flagUrl } = req.body;
    const newCity = new City({
      cityName: cityName,
      cityPic: cityPic,
      country: country,
      facts: facts,
      flagUrl: flagUrl,
    });
    newCity
      .save()
      .then((newCity) => {
        return res.json({ success: true, respuesta: newCity });
      })
      .catch((error) => {
        return res.json({ success: false, error: error });
      });
  },

  allCities: async (req, res) => {
    // Devolver al FRONTEND todas las ciudades
    try {
      const data = await City.find();
      res.json({
        respuesta: data,
      });
    } catch (error) {
      console.log("error");
    }
  },

  singleCity: async (req, res) => {
    //devolver al FRONTEND solo las ciudades que necesito x ID

    const id = req.params.id;

    try {
      const data = await City.findById(id);
      res.json({
        success: true,
        respuesta: data,
      });
    } catch {
      res.json({
        success: false,
        respuesta: "Error loading cities",
      });
    }
  },
};

module.exports = cityController;

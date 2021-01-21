const City = require("../models/City");

const cityController = {
  addCity: (req, res) => {
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
    const data = await City.find();

    // Devolver al FRONTEND todas las ciudades
    res.json({
      respuesta: data,
    });
  },

  singleCity: async (req, res) => {
    //devolver al FRONTEND solo las ciudades que necesito

    const id = req.params.id;

    const data = await City.findById(id);

    res.json({
      respuesta: data,
    });
  },
};

module.exports = cityController;

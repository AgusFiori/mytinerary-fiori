const data = [
  {
    _id: 1,
    cityName: "Paris",
    cityPic:
      "https://transilien.com/sites/transilien/files/styles/manual_crop/public/2019-11/Arc%20de%20Triomphe.jpg?itok=SVq4PeII",
    country: "France",
    facts: [
      "Turning a baguette upside down is unlucky.",
      "There are over 400 kinds of cheese made in France.",
      "France is the most popular tourist destination in the world.",
    ],
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png",
  },
  {
    _id: 2,
    cityName: "Singapore",
    cityPic:
      "https://www.ecestaticos.com/image/clipping/3b86fad7b3059474fad79627e897ea88/como-singapur-ha-conseguido-ser-uno-de-los-paises-mas-limpios-del-mundo.jpg",
    country: "Singapore",
    facts: [
      "The locals speak Singlish, not just English.",
      " It’s one of the world’s greenest cities.",
      "It’s home to the world’s first night zoo.",
    ],
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/1200px-Flag_of_Singapore.svg.png",
  },
  {
    _id: 3,
    cityName: "New York",
    cityPic:
      "https://blog-www.pods.com/wp-content/uploads/2019/04/MG_1_1_New_York_City-1.jpg",
    country: "USA",
    facts: [
      "France gifted the Statue of Liberty to the United States in 1886 for its centennial celebration.",
      "A little over 8 million people live in New York City.",
      "New York City became the first capital of the United States in 1789.",
    ],
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png",
  },
  {
    _id: 4,
    cityName: "Buenos Aires",
    cityPic:
      "https://digital.ihg.com/is/image/ihg/intercontinental-buenos-aires-5911903686-2x1",
    country: "Argentina",
    facts: [
      "Buenos Aires metro system is the oldest in Latin America.",
      "It's home to the widest street in the world: Avenida 9 de Julio.",
      "It's the first Latin America city that recognized LGBT rights.",
    ],
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png",
  },
];

const cityController = {
  allCities: (req, res) => {
    // Devolver al FRONTEND todas las ciudades
    res.json({
      respuesta: data,
    });
  },

  singleCity: (req, res) => {
    //devolver al FRONTEND solo las ciudades que necesito
    const id = parseInt(req.params.id);
    data.map((element) => {
      if (element._id === id) {
        res.json({
          respuesta: element,
        });
      }
    });
  },
};

module.exports = cityController;

const express = require("express");
const cors = require("cors");
const app = express(); // app es la aplicacion

// MIDDLEWARE: funcion que se ejecuta antes de llegar a la ruta
app.use(cors());

app.use("/api", (req, res) => {
  // cuando app reciba un pedido get a la ruta '/api'
  res.json({
    ciudades: "rio",
  });
});

app.listen(4000, () => console.log("App listening on port 4000")); // la pongo a escuchar en el puerto 4000

const express = require("express");

const cors = require("cors");
const app = express(); // app es la aplicacion
const router = require("./routes/index");
require("dotenv").config(); // para variables de entorno
require("./config/database");

// MIDDLEWARE: funcion que se ejecuta antes de llegar a la ruta
app.use(cors());

app.use(express.json()); // middleware para traducir JSON

app.use("/", router); // cuando hagan un pedido de cualquier indole, ejecuta router

app.listen(4000, () => console.log("App listening on port 4000")); // la pongo a escuchar en el puerto 4000

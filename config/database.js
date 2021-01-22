const mongoose = require("mongoose");
require("dotenv").config();

// conexion a la BASE DE DATOS
// process.env.MONGODB va a ir como primer parametro de .connect
mongoose
  .connect(
    "mongodb+srv://agusfiori:E77G9IxKukllBUyW@cluster0.2722e.mongodb.net/mytinerary-fiori?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(error));

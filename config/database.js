const mongoose = require("mongoose");

// conexion a la BASE DE DATOS
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

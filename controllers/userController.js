const User = require("../models/User");
const Itinerary = require("../models/Itinerary");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {
  register: async (req, res) => {
    const errores = [];
    const {
      username,
      firstname,
      lastname,
      email,
      urlPic,
      password,
      confirmation,
      country,
      role,
      date,
    } = req.body;

    const userExists = await User.findOne({ username: username });
    const emailExists = await User.findOne({ email: email });
    if (userExists) {
      errores.push("Username already exists");
    }
    if (emailExists) {
      errores.push("Email has already been registered");
    }

    if (!errores.length) {
      var hashedPassword = bcryptjs.hashSync(password, 10);
      var newUser = new User({
        username,
        firstname,
        lastname,
        email,
        urlPic,
        password: hashedPassword,
        confirmation,
        country,
        role,
        date,
      });
      var newSavedUser = await newUser.save();
      var token = jwt.sign({ ...newSavedUser }, process.env.SECRET_KEY, {});
    }

    return res.json({
      success: errores.length ? false : true,
      errores: errores,
      respuesta: !errores.length && {
        token,
        firstname: newSavedUser.firstname,
        urlPic: newSavedUser.urlPic,
        username: newSavedUser.username,
      },
    });
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username: username });
    if (!userExists) {
      return res.json({
        success: false,
        msg: "Username or password does not match",
      });
    }
    const passwordMatches = bcryptjs.compareSync(password, userExists.password);
    if (!passwordMatches)
      return res.json({
        success: false,
        msg: "Username or password does not match",
      });
    var token = jwt.sign({ ...userExists }, process.env.SECRET_KEY, {});

    return res.json({
      success: true,
      respuesta: {
        token,
        firstname: userExists.firstname,
        urlPic: userExists.urlPic,
        username: userExists.username,
      },
    });
  },
  // loguearse desde el local storage, para que al recargar no se pierda la informacion
  logFromLS: async (req, res) => {
    res.json({
      success: true,
      respuesta: {
        token: req.body.token,
        firstname: req.user.firstname,
        urlPic: req.user.urlPic,
        username: req.user.username,
      },
    });
  },

  postComment: async (req, res) => {
    try {
      await Itinerary.findOneAndUpdate(
        { _id: req.params.id },

        {
          $push: {
            comments: {
              avatar: req.body.urlPic,
              username: req.body.firstname,
              comment: req.body.comment,
            },
          },
        },
        { safe: true, upsert: true, new: true }
      );

      res.json({
        success: true,
        respuesta: "Comentario grabado",
      });
    } catch (error) {
      res.json({
        success: false,
        respuesta: error,
      });
    }
  },
};

module.exports = userController;

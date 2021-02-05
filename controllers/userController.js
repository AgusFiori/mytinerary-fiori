const User = require("../models/User");
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
    const errores = [];
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
};

module.exports = userController;

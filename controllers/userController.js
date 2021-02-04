const User = require("../models/User");
const bcryptjs = require("bcryptjs");

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
    if (confirmation !== password) errores.push("Passwords don't match");
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
    }
    // console.log(errores);

    return res.json({
      success: errores.length ? false : true,
      errores: errores,
      respuesta: newSavedUser,
    });
  },

  login: async (req, res) => {
    const errores = [];
    const { username, password } = req.body;
    console.log("hola");
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

    return res.json({ success: true, respuesta: userExists });
  },
};

module.exports = userController;

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
        id: newSavedUser._id,
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
        id: userExists._id,
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
        id: req.user._id,
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
              username: req.body.name,
              comment: req.body.actualComment,
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
  deleteComment: async (req, res) => {
    try {
      const itineraryId = req.params.itineraryId;
      const commentId = req.params.commentId;
      const respuesta = await Itinerary.findOneAndUpdate(
        { _id: itineraryId },
        {
          $pull: {
            comments: {
              _id: commentId,
            },
          },
        },
        { new: true }
      );
      res.json({
        success: true,
        respuesta: "Comentario borrado",
      });
    } catch (error) {
      res.json({
        success: false,
        respuesta: error,
      });
    }
  },

  likeComment: async (req, res) => {
    console.log(req.user);

    try {
      await Itinerary.findOneAndUpdate(
        { _id: req.params.id },
        {
          $addToSet: {
            likes: req.user._id,
          },
        }
      );
      res.json({
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  },
  dislikeComment: async (req, res) => {
    try {
      await Itinerary.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: {
            likes: req.user._id,
          },
        }
      );
      res.json({
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  },
  editComment: async (req, res) => {
    try {
      await Itinerary.findOneAndUpdate(
        {
          _id: req.params.id,
          "comments._id": req.body.commentToEdit.commentId,
        },
        {
          $set: {
            "comments.$.comment": req.body.commentToEdit.comment,
          },
        },
        { new: true }
      );
      res.json({
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userController;

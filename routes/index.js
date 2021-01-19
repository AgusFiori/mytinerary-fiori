const { Router } = require("express");
const express = require("express");
const router = express.Router;

Router.route("/cities").get("hace algo").post("hace otra cosa");

Router.route("/city/:id").get("hace algo");

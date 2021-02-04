const validator = {
  validate: (req, res, next) => {
    if (2 + 2 === 4) {
      res.json({
        success: false,
        msg: "me quede en el validator",
      });
    } else {
      next();
    }
  },
};

module.exports = validator;

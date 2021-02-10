const Joi = require("joi");

const validator = {
  newUserValidation: (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string().trim().required().min(3).max(30).messages({
        "string.min": "Username must have at least 3 characters!",
        "string.max": "Username must contain less than 30 characters",
      }),
      password: Joi.string()
        .min(6)
        .required()
        .pattern(/^(?=.*\d).{6,30}$/)
        .messages({
          "string.min": "Password must have at least 3 characters!",
          "string.pattern.base":
            "Password must contain at least six characters and a number",
        }),
      confirmation: Joi.ref("password"),
      email: Joi.string()
        .required()
        .email({ tlds: { allow: false } })
        .messages({ "string.email": "You must enter a valid email" }),
      firstname: Joi.string().trim().required().min(2).max(15),
      lastname: Joi.string().trim().required().min(2).max(15),
      urlPic: Joi.string().uri(),
      country: Joi.string(),
      loggedWithGoogle: Joi.boolean().invalid(false),
    });

    const validation = schema.validate(req.body, { abortEarly: false });

    if (!validation.error) {
      next();
    } else {
      res.json({
        success: false,
        errors: validation.error,
      });
    }
  },
};

// ^(?=.*\d).{6,20}$ validacion un poco mas simple (6 a 20 caracteres y por lo menos un numero)
// ^(?=.{8,20})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&+=/*.]).*$ validacion mas compleja // 8 a 20 caracteres, al menos una mayuscula, un numero y un caracter especial del set !@#$%^&+=/*.

module.exports = validator;

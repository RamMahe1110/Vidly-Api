const Joi = require("joi");

function validateUser(user) {
  const schema = {
    email: Joi.string()
      .min(6)
      .max(250)
      .email()
      .required(),
    password: Joi.string()
      .min(3)
      .max(250)
      .required()
  };
  return Joi.validate(user, schema);
}

module.exports = {
  validate: validateUser
};

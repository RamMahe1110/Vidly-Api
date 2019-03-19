const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10
    }
  })
);

function validateCustomer(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(10)
      .max(10)
      .required(),
    isGold: Joi.boolean()
  };

  return Joi.validate(genre, schema);
}

module.exports = {
  Customer,
  validate: validateCustomer
};

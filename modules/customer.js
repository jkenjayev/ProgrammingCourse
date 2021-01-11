const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 5,
      maxlength: 1024,
      required: true,
    },
    phone: {
      type: String,
      minlength: 5,
      maxlength: 1024,
    },
    isVip: {
      type: Boolean,
      default: false,
      required: true,
    },
    bonusPoint: {
      type: Number
    }

  });
  
  const Customer = mongoose.model("Customer", schema);
  

  function validateCustomer(customer) {
    const schema = {
      name: Joi.string().required().min(4),
      phone: Joi.string().required().min(5),
      isVip: Joi.boolean().required(),
      bonudPoint: Joi.number().required()
    };
  
    return Joi.validate(customer, schema);
  }

  exports.validate = validateCustomer;
  exports.Customer = Customer;
  exports.customerSchema = schema;
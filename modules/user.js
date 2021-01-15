const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const schema = mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    required: true,
    maxlength: 255,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    maxlength: 1024,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

schema.methods.generateAuthToken = function () {
  const token =  jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", schema);

function validateUser(user) {
  const schema = {
    name: Joi.string().required().min(3).max(255),
    password: Joi.string().required().min(8).max(255),
    email: Joi.string().required().min(3).max(255).email(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;

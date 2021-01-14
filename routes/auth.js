const express = require("express");
const { User } = require("../modules/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password is wrong");

  const isValidPwd = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPwd) return res.status(400).send("Email or password is wrong");

  const token = jwt.sign({_id: user._id}, "bumeningparolim");
  res.header("x-auth-token", token).send(true);
});

function validate(request) {
  const schema = {
    password: Joi.string().required().min(8).max(255),
    email: Joi.string().required().min(3).max(255).email(),
  };

  return Joi.validate(request, schema);
}

module.exports = router;

const mongoose = require("mongoose");
const express = require("express");
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
  }
});

const Customer = mongoose.model("Customer", schema);

const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("Oops! Not found such customer");

  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isVip: req.body.isVip,
  });
  const result = await customer.save();

  res.status(201).send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
        name: req.body.name,
        phone: req.body.phone,
        isVip: req.body.isVip,
    },
    { new: true }
  );
  if (!customer) return res.status(404).send("Not found such customer");

  const result = await customer.save();
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send("Not found such category");

  res.send(customer);
});

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().required().min(4),
    phone: Joi.string().required().min(5),
    isVip: Joi.boolean().required(),
  };

  return Joi.validate(customer, schema);
}

module.exports = router;

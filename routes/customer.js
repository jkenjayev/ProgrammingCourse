const express = require("express");
const { validate, Customer } = require("../modules/customer");
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
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isVip: req.body.isVip,
    bonusPoint: req.body.bonusPoint
  });
  const result = await customer.save();

  res.status(201).send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
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



module.exports = router;

const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");

const schema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  author: {
    type: String,
    minlength: 5,
    maxlength: 1024,
  },
  isPublished: {
    type: Boolean,
    required: true,
  },
  fee: {
    type: Number,
    required: () => {
      return this.isPublished;
    },
  },
});

const Category = mongoose.model("Category", schema);

const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find().sort("title");
  res.send(categories);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send("Oops! Not found such category");

  res.send(category);
});

router.post("/", async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = new Category({
    title: req.body.title,
    author: req.body.author,
    fee: req.body.fee,
    isPublished: req.body.isPublished,
  });
  const result = await category.save();

  res.status(201).send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndModify(
    req.params.id,
    {
      title: req.body.title,
      author: req.body.author,
      fee: req.body.fee,
      isPublished: req.body.isPublished,
    },
    { new: true }
  );
  if (!category) return res.status(404).send("Not found such category");

  const result = await category.save();
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category) return res.status(404).send("Not found such category");

  res.send(category);
});

function validateCategory(category) {
  const schema = {
    title: Joi.string().required().min(4),
    author: Joi.string().required().min(5),
    isPublished: Joi.boolean().required(),
    fee: Joi.number().required(),
  };

  return Joi.validate(category, schema);
}

module.exports = router;

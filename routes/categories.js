const express = require("express");
const { validate, Category } = require("../modules/category");
const auth = require("../middleware/auth");
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

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = new Category({
    title: req.body.title,
  });
  const result = await category.save();

  res.status(201).send(result);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndModify(
    req.params.id,
    {
      title: req.body.title,
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

module.exports = router;

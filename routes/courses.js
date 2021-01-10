const express = require("express");
const { Category } = require("../modules/category");
const { validate, Course } = require("../modules/course");
const router = express.Router();

router.get("/", async (req, res) => {
  const courses = await Course.find().sort("title");
  res.send(courses);
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).send("Oops! Not found such course");

  res.send(course);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Not found such category");

  const course = new Course({
    title: req.body.title,
    category: {
      _id: category._id,
      title: category.title,
    },
    trainer: req.body.trainer,
    tags: req.body.tags,
    status: req.body.status,
  });
  const result = await course.save();

  res.status(201).send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Not found such category");

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      author: {
        _id: category._id,
        title: category.title,
      },
      trainer: req.body.trainer,
      tags: req.body.tags,
      status: req.body.status,
    },
    { new: true }
  );
  if (!course) return res.status(404).send("Not found such course");

  const result = await course.save();
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);
  if (!course) return res.status(404).send("Not found such course");

  res.send(course);
});

module.exports = router;

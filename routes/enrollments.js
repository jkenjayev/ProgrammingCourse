const express = require("express");
const { Course } = require("../modules/course");
const { Category } = require("../modules/category");
const { validate, Enrollment } = require("../modules/enrollment");
const router = express.Router();

router.get("/", async (req, res) => {
  const enrollments = await Enrollment.find().sort("title");
  res.send(enrollments);
});

router.get("/:id", async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id);
  if (!enrollment)
    return res.status(404).send("Oops! Not found such enrollment");

  res.send(enrollment);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.findById(req.body.courseId);
  if (!course) return res.status(400).send("Not found such course");

  const customer = await Category.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Not found such customer");

  const enrollment = new Enrollment({
    course: {
      _id: course._id,
      title: course.title,
    },
    customer: {
      _id: customer._id,
      title: customer.name,
    },
    courseFee: req.body.courseFee,
  });
  const result = await enrollment.save();

  res.status(201).send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.findById(req.body.courseId);
  if (!course) return res.status(400).send("Not found such course");

  const enrollment = await Enrollment.findByIdAndUpdate(
    req.params.id,
    {
      course: {
        _id: course._id,
        title: course.title,
      },
      customer: {
        _id: customer._id,
        title: customer.name,
      },
      courseFee: req.body.courseFee,
    },
    { new: true }
  );
  if (!enrollment) return res.status(404).send("Not found such enrollment");

  const result = await enrollment.save();
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const enrollment = await Enrollment.findByIdAndRemove(req.params.id);
  if (!enrollment) return res.status(404).send("Not found such enrollment");

  res.send(enrollment);
});

module.exports = router;

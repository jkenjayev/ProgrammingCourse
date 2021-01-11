const { Enrollment, validate } = require("../modules/enrollment");
const { Course } = require("../modules/course");
const { Customer } = require("../modules/customer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const enrollments = await Enrollment.find().sort('-dateStart');
  res.send(enrollments);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if(!customer) return res.status(400).send("Not found such customer");

  const course = await Course.findById(req.body.courseId);
  if(!course) return res.status(400).send("Not found such course");

  const enrollment = new Enrollment({
    customer: {
      _id: customer._id,
      name: customer.name
    },
    course: {
      _id: course._id,
      title: course.title
    },
    courseFee: course.fee,
  });
  if(customer.isVip) enrollment.courseFee = course.fee - (0.2 * course.fee);

  const result = await enrollment.save();
  customer.bonusPoint ++;
  customer.save();

  res.send(result);
});

// router.get("/:id", async (req, res) => {
//   const enrollment = await Enrollment.find
// });

module.exports = router;
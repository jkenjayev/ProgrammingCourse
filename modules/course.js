const mongoose = require("mongoose");
const { categorySchema } = require("./category");
const Joi = require("joi");

const schema = new mongoose.Schema({
    title: {
      type: String,
      minlength: 5,
      maxlength: 1024,
      required: true,
    },
    trainer: {
      type: String,
      minlength: 5,
      maxlength: 1024,
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Inactive"]
    },
    category: {
        type: categorySchema,
        required: true
    },
    tags: {
      type: [String],
    }
  });
  
  const Course = mongoose.model("Course", schema);
  

  function validateCourse(category) {
    const schema = {
      title: Joi.string().required().min(4),
      trainer: Joi.string().required().min(5),
      status: Joi.string().required(),
      categoryId: Joi.string().required(),
      tags: Joi.array().items(Joi.string())
    };
  
    return Joi.validate(category, schema);
  }

  exports.validate = validateCourse;
  exports.Course = Course;
  exports.courseSchema = schema;
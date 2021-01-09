const mongoose = require("mongoose");
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
  

  function validateCategory(category) {
    const schema = {
      title: Joi.string().required().min(4),
      author: Joi.string().required().min(5),
      isPublished: Joi.boolean().required(),
      fee: Joi.number().required(),
    };
  
    return Joi.validate(category, schema);
  }

  exports.validate = validateCategory;
  exports.Category = Category;
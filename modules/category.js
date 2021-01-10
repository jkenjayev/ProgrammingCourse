const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
    title: {
      type: String,
      minlength: 5,
      maxlength: 1024,
      required: true,
    }
  });
  
  const Category = mongoose.model("Category", schema);
  

  function validateCategory(category) {
    const schema = {
      title: Joi.string().required().min(4),
    };
  
    return Joi.validate(category, schema);
  }

  exports.validate = validateCategory;
  exports.Category = Category;
  exports.categorySchema = schema;
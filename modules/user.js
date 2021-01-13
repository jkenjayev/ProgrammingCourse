const mongoose = require("mongoose");
const Joi = require("joi");

const schema = mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        required: true,
        maxlength: 255
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
        maxlength: 255
    },
    email: {
        type: String,
        unique: true,
        required: true   
    }
});

const User = mongoose.model("User", schema);

function validateUser(user) {
    const schema = {
        name: Joi.string().required().min(3).max(255),
        password: Joi.string().required().min(8).max(255),
        email: Joi.string().required().min(3).max(255).email(),
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
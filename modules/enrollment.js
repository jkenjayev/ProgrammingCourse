const mongoose = require("mongoose");
const Joi = require("joi");

Enrollment = mongoose.model("Enrollment", new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                minlength: 3,
                maxlength: 50,
                required: true
            }
        }),
        required: true,
    },
    course: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            }
        }),
        required: true,
    },
    courseFee: {
        type: Number,
        min: 0
    },
    dateStart: {
        type: Date,
        required: true,
        default: Date.now()
    }
}));

function validateEnrollment(enrollment) {
    const schema = {
        customerId: Joi.string().required(),
        courseId: Joi.string().required()
    };

    return Joi.validate(enrollment, schema);
}

exports.Enrollment = Enrollment;
exports.validate = validateEnrollment;
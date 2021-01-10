const { courseSchema } = require("./course");
const { customerSchema } = require("./customer");
const mongoose = require("mongoose");
const Joi = require("joi");

const enrollmentSchema = new mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true,
    },
    course: {
        type: courseSchema,
        required: true
    },
    courseFee: {
        type: Number,
        required: true
    },
    dateStart: {
        type: Date,
        default: Date.now()
    }

});
const Enrollment = mongoose.model("Enrollment", enrollmentSchema);


function validateEnrollment(enrollment) {
    const schema = {
        customerId: Joi.string().required(),
        courseId: Joi.string().required(),
        courseFee: Joi.number().required(),
    }
}

exports.Enrollment = Enrollment;
exports.validate = validateEnrollment;
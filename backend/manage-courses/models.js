const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
    course_code: { type: Number, required: true },
    course_name: { type: String, required: true },
    description: { type: String, required: true },
    credits: { type: Number, required: true }
});

module.exports = mongoose.model('Course', coursesSchema);
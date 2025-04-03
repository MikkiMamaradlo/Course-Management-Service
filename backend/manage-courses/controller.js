const Course = require('./models');// Import the model

// Controller function to handle storing battery data
const courses = async (req, res) => {
    try {
        const { course_code, course_name, description, credits } = req.body;

        // Basic validation
        if (!course_code || !course_name || !description || !credits) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Create a new Battery document and save it
        const newCourse = new Course({ course_code, course_name, description, credits });
        await newCourse.save();

        res.status(201).json({
            message: 'data stored successfully',
            data: newCourse
        });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

module.exports = { courses };

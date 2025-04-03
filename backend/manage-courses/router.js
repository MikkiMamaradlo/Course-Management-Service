const express = require('express');
const { courses } = require('./controller')

const router = express.Router();

// POST endpoint to handle battery data
router.post('/add', courses);

module.exports = router;
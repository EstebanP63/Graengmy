// server/routes/lessons.js
const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson')

router.get('/lessons', async (req, res) => {  
    try {
        const lessons = await Lesson.find();
        res.json(lessons);
    } catch (err) {
        res.status(500).json({ error: 'failed to fetch lessons' })
    }
});

module.exports = router;

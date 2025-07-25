// server/routes/lessons.js
const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson')

router.post('/lessons', async (req, res) => {
  try {

    const existingLesson = await Lesson.findOne({
        name: req.body.name,
        description: req.body.description
    });

    if (existingLesson) {
        return res.status(409).json({ message: 'Lesson already exists', lesson: existingLesson });
    }

    const lastLesson = await Lesson.findOne().sort({ order: -1 })

    const nextOrder = lastLesson ? lastLesson.order + 1 : 1

    const newLesson = new Lesson({
        ...req.body,
        order: nextOrder,
        contentBlocks: req.body.contentBlocks.map((block, index) => ({
            type: block.type,
            payload: block.payload,
            order: index + 1
        }))
    })

    const savedLesson = await newLesson.save();
    if (lastLesson) {
        await Lesson.findByIdAndUpdate(lastLesson._id, {
            $push: { nextLessonIds: savedLesson._id }
        });
    }
    res.status(201).json(savedLesson);
  } catch (error) {
    res.status(500).json({ message: 'Error saving lesson', error });
  }
});

router.get('/lessons', async (req, res) => {  
    try {
        const lessons = await Lesson.find();
        res.json(lessons);
    } catch (err) {
        res.status(500).json({ error: 'failed to fetch lessons' })
    }
});

module.exports = router;

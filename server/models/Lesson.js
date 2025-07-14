const mongoose = require('mongoose')

const contentBlockSchema = new mongoose.Schema({
  type: { type: String, required: true }, //  'text', 'table', 'question', etc.
  order: { type: Number, required: true },

  payload: { type: mongoose.Schema.Types.Mixed, required: true }

  /* Payload schemas
  
  If (type === text) payload = string
  If (type === table) payload = { headers: [String], rows: [[String]] }
  If (type === question) payload = { text: String, answer: String }
  
  Maybe add a type for multiple choice questions
  Maybe add images in the future
    
  */
}, { _id: false })

const lessonSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true},
  contentBlocks: [contentBlockSchema],
  order: Number,
  author:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  nextLessonIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  modifiedBy:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true })
module.exports = mongoose.model('Lesson', lessonSchema)

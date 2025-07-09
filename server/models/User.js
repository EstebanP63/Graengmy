const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed later!
  role:     { type: String, enum: ['student', 'admin'], default: 'student' },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
}, { timestamps: true })
module.exports = mongoose.model('User', userSchema)

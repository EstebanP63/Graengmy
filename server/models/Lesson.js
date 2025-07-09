const lessonSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  content:     { type: String, required: true },
  author:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  modifiedBy:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true })
module.exports = mongoose.model('Lesson', lessonSchema)

require('dotenv').config()
const User = require('./models/User');
const Lesson = require('./models/Lesson');
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ Connection error:', err))

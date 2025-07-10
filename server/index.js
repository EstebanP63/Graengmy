require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const User = require('./models/User');
const Lesson = require('./models/Lesson');
const authRoutes = require('./routes/auth');

app.use(express.json())
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}))

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ Connection error:', err))

app.use('/', authRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server Running")
})

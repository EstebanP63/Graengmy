const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User') // adjust path if needed

const router = express.Router()
const SECRET = process.env.JWT_SECRET || 'dev_secret_key' // make this secure in production!

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body

    const existing = await User.findOne({ email })
    if (existing) return res.status(409).json({ error: 'Email already in use' })

    const hashed = await bcrypt.hash(password, 10)

    const newUser = new User({ username, email, password: hashed })
    await newUser.save()

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, SECRET, { expiresIn: '2h' })

    res.status(201).json({ token }) // or { message: 'User created' }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) return res.status(401).json({ error: 'Usuario no encontrado'})

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta'})

        const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '2h'})
        
        res.json({ token })

    } catch (err) {
        res.status(500).json({error: err.message })
    }
})

module.exports = router

const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(cors())

const SECRET = process.env.JWT_SECRET || "movie-explorer-secret"

// WASIL 3A MONGODB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log("MongoDB Error:", err))

// MODEL TABA3 EL USER
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
}))

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body
  if (await User.findOne({ username })) return res.json({ error: "User already exists" })
  const hashed = await bcrypt.hash(password, 10)
  await new User({ username, password: hashed }).save()
  res.json({ message: "Registered!" })
})

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (!user) return res.json({ error: "User not found" })
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.json({ error: "Wrong password" })
  const token = jwt.sign({ username }, SECRET, { expiresIn: '1d' })
  res.json({ token, username })
})

app.post('/api/logout', (req, res) => {
  res.json({ message: "Logged out" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Backend running on " + PORT))
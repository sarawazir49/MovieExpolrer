console.log("its working!")

const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const app = express()
app.use(express.json())
app.use(cors())

const SECRET = "movie-explorer-secret"

let users = []
if (fs.existsSync('users.json')) {
  users = JSON.parse(fs.readFileSync('users.json'))
}

function saveUsers() {
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2))
}

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body
  if (users.find(u => u.username === username)) return res.json({ error: "User already exists" })
  const hashed = await bcrypt.hash(password, 10)
  users.push({ username, password: hashed })
  saveUsers()
  res.json({ message: "Registered!" })
})

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body
  const user = users.find(u => u.username === username)
  if (!user) return res.json({ error: "User not found" })
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.json({ error: "Wrong password" })
  const token = jwt.sign({ username }, SECRET, { expiresIn: '1d' })
  res.json({ token, username })
})

app.post('/api/logout', (req, res) => {
  res.json({ message: "Logged out" })
})

app.listen(5000, () => console.log("Backend running on 5000"))
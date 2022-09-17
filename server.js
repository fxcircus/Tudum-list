const express = require('express')
const { appendFile } = require('fs')
const path = require('path')
require('dotenv').config()
require('./config/database.js')

const app = express(``)

// Middleware:
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))

// API middleware:
app.use('/api/items', require('./routes/api/items'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Backend is listening on port ${PORT}`)
})
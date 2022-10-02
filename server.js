const express = require('express')
const { appendFile } = require('fs')
const path = require('path')
const cors = require('cors')
require('dotenv').config()
require('./config/database.js')

const app = express()
app.use(cors())

// Middleware:
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))
// app.options('*', cors()) // include before other routes

// API middleware:
app.use('/api/items', require('./routes/api/items'))

// "catch all" route
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Backend is listening on port ${PORT}`)
})
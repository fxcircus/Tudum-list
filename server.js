const express = require('express')
const { appendFile } = require('fs')
const path = require('path')
const cors = require('cors')
require('dotenv').config()
require('./config/database.js')

const app = express()
app.use(cors({
    origin: "*"
}))

// Middleware:
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))

app.options('*', cors()) // enable pre-flight req

// API middleware:
app.use('/api/items', require('./routes/api/items'))

app.get('localhost:8001', cors(), function(req, res) {
    console.log("!%WRYSE^YUWE&")
})

// "catch all" route
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const PORT = process.env.PORT || 2999
app.listen(PORT, () => {
    console.log(`Backend is listening on port ${PORT}`)
})
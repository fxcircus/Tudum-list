const express = require('express')
const { appendFile } = require('fs')
const path = require('path')
const app = express(``)
require('dotenv').config()
require('./config/database.js')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Backend is listening on port ${PORT}`)
})
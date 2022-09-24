
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema ({
    title: {type: String, required: true},
    type: String,
    isChecked: Boolean,
    url: String,
    rank: Number
},
{
    timestamps: true
})

module.exports = mongoose.model('Item', itemSchema)
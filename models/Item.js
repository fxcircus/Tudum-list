
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema ({
    title: { type: String, required: true, trim: true},
    type: { type: String, required: false },
    isChecked: { type: Boolean, required: false, default: false },
    url: String,
    rowNum: { type: Number, required: false, default: 0 },
    rank: { type: Number, required: false, default: 0 }
},
{
    timestamps: true
})

module.exports = mongoose.model('Item', itemSchema)
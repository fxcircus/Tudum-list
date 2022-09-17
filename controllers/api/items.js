const Item = require('../../models/Item')

module.exports = {
    createItem,
    getItems,
    updateItem,
    deleteItem
}

// Create
async function createItem(req, res) {
    try {
        const createdItem = await Item.create(req.body)
        res.status(200).json(createdItem)
    } catch(e) {
        res.status(400).json(e)
    }
}

// Read
async function getItems(req, res) {
    try {
        const items = await Item.find({})
        res.status(200).json(items)
    } catch(e) {
        res.status(400).json(e)
    }
}

// Update
async function updateItem(req, res) {
    const { body } = req
    const { id } = req.params
    Item.findByIdAndUpdate(id, body, {new: true}, (err, updatedItem) => {
        if(!err) {
            res.status(200).json(updatedItem)
        } else {
            res.status(400).json(err)
        }
    })
}

// Delete
async function deleteItem(req, res) {
    Item.findByIdAndDelete(req.params.id, (err, deletedItem)=> {
        if(!err) {
            res.status(200).json(deletedItem)
        } else {
            res.status(400).json(err)
        }
    })
}
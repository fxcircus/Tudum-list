const express = require('express')
const router = express.Router()
const itemsCtrl = require('../../controllers/api/items')

// POST /api/items
router.post('/', itemsCtrl.createItem)

// GET /api/items
router.get('/', itemsCtrl.getItems)

// PUT /api/items/:id
router.put('/:id', itemsCtrl.updateItem)

// DELETE /api/items/:id
router.delete('/:id', itemsCtrl.deleteItem)

module.exports = router
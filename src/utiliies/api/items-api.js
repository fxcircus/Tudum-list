import { sendRequest } from "./send-request"
const BASE_URL = '/api/items'

// CREATE
export async function createItem (itemData) {
    return sendRequest (`${BASE_URL}`, 'POST', itemData)
}

// READ
export async function getItems() {
    return sendRequest (BASE_URL, 'GET')
}

// UPDATE
export async function updateItem (itemId, itemData) {
    return sendRequest (`${BASE_URL}/${itemId}`, 'PUT', itemData)
}

// DELETE
export async function deleteItem (itemId) {
    return sendRequest (`${BASE_URL}/${itemId}`,'DELETE')
}
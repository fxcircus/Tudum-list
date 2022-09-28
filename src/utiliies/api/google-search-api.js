import { sendRequest } from "./send-request"
const GOOGLE_TOKEN = process.env.REACT_APP_GOOGLE_SEARCH_API_KEY
const BASE_URL = `https://customsearch.googleapis.com/customsearch/v1?cx=e60ce9e2fa77c4273&key=${GOOGLE_TOKEN}`

export async function googleTitle (titleName) {
    const res = await sendRequest (`${BASE_URL}&q=${titleName}`)
    return res.items[0].link
}
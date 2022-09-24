import List from "../../components/List"
import { useState, useEffect } from "react"
import { getItems } from "../../utiliies/api/items-api"

export default function App() {
    const [ items, setItems ] = useState(null)

    const loadItems = async () => {
        try {
            const foundItems = await getItems()
            setItems(foundItems)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        loadItems()
    }, [])

    return(
        <div className="homepage">
            <img src={"/tudumlist_icon_transperent.png"}/>
            <h2>Netflix Watchlist</h2>
            <List />
        </div>
    )
}
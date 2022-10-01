import List from "../../components/List"
import Foooter from "../../components/Footer"
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
            <h3>Cross-platform watch list</h3>
            <List items={items} setItems={setItems} loadItems={loadItems} />
            <Foooter />
        </div>
    )
}
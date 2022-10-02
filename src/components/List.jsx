// import data from "../utiliies/sample_data"
import { useState } from "react"
import AddItemList from "./AddItemForm"
import { deleteItem, updateItem } from "../utiliies/api/items-api"

export default function List({ items, setItems, loadItems}) {
    const [ render, setRender ] = useState(false)

    const starCssClass = (rank, starNum) => {
        return rank >= starNum ? "star checked" : "star not-checked"
    }

    const delItem = async (itemId) => {
        const deletedItem = await deleteItem(itemId)
        loadItems()
    }

    const update = async (itemId, key, val) => {
        let keyValPair = {}
        keyValPair[key] = val
        const updatedItem = await updateItem(itemId, keyValPair)
        loadItems()
        setRender(!render)
    }

    const loaded = () => {
        return (
            <div className="List">
                <table>
                    <tfoot>
                        {items.map((item, idx) => {
                        return (
                            <tr key={idx}>
                                <td>
                                    <label className="container">
                                        <input type="checkbox" checked={item.isChecked ? "checked": null}
                                        onChange={(e) => {update(item._id, "isChecked", !item.isChecked)}} />
                                        <span className="checkmark"></span>
                                    </label>
                                </td>
                                <td>
                                    <a href={item.url} target="_blank" text>
                                        {item.isChecked ? <del>{item.title}</del> : item.title}
                                    </a>
                                </td> 
                                <td className="content-type">{item.type === "tv" ? "📺" : "🎬"}</td>
                                <td>
                                    <button className={starCssClass(item.rank, 1)} onClick={(e) => {update(item._id, "rank", 1)}}>⭑</button>
                                    <button className={starCssClass(item.rank, 2)} onClick={(e) => {update(item._id, "rank",  2)}}>⭑</button>
                                    <button className={starCssClass(item.rank, 3)} onClick={(e) => {update(item._id, "rank",  3)}}>⭑</button>
                                    <button className={starCssClass(item.rank, 4)} onClick={(e) => {update(item._id, "rank",  4)}}>⭑</button>
                                    <button className={starCssClass(item.rank, 5)} onClick={(e) => {update(item._id, "rank",  5)}}>⭑</button>
                                    
                                </td>
                                <td className="delete-button"><button onClick={(e) => {delItem(item._id)}}>x</button></td>
                            </tr>
                        )
                    })}
                    </tfoot>
                </table>
                <AddItemList loadItems={loadItems} />
                <script async src="https://cse.google.com/cse.js?cx=e60ce9e2fa77c4273">
                </script>
                <div className="gcse-search"></div> 
            </div>
        )
    }

    const loading = () => {
        return (
            <div>loading</div>
        )
    }

    return items ? loaded() : loading
}
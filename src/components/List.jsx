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

    const updateRank = async (id, newRank) => {
        const itemRank = { rank: newRank }
        const updatedItem = await updateItem(id, itemRank)
        loadItems()
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
                                        <input type="checkbox" checked={item.isChecked ? "checked": null}></input>
                                        <span className="checkmark"></span>
                                    </label>
                                </td>
                                <td><a href={item.url} target="_blank" text>{item.title}</a></td> 
                                <td>{item.type === "tv" ? "📺" : "🎬"}</td>
                                <td>
                                    <button className={starCssClass(item.rank, 1)} onClick={(e) => {updateRank(item._id, 1)}}>⭑</button>
                                    <button className={starCssClass(item.rank, 2)} onClick={(e) => {updateRank(item._id, 2)}}>⭑</button>
                                    <button className={starCssClass(item.rank, 3)} onClick={(e) => {updateRank(item._id, 3)}}>⭑</button>
                                    <button className={starCssClass(item.rank, 4)} onClick={(e) => {updateRank(item._id, 4)}}>⭑</button>
                                    <button className={starCssClass(item.rank, 5)} onClick={(e) => {updateRank(item._id, 5)}}>⭑</button>
                                    
                                </td>
                                <td className="delete-button"><button onClick={(e) => {delItem(item._id)}}>x</button></td>
                            </tr>
                        )
                    })}
                    </tfoot>
                </table>
                <AddItemList loadItems={loadItems} />     
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
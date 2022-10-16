// import data from "../utiliies/sample_data"
import { useState } from "react"
import AddItemList from "./AddItemForm"
import { deleteItem, updateItem } from "../utiliies/api/items-api"
import { sortItemsArr } from "../utiliies/sorting/sortData"

export default function List({ items, setItems, loadItems}) {
    const [ render, setRender ] = useState(false)
    const [ titleCol, setTitleCol] = useState("↓")
    const [ typeCol, setTypeCol] = useState("↓")
    const [ rankCol, setRankCol] = useState("↓")

    const starCssClass = (rank, starNum) => {
        return rank >= starNum ? "star checked" : "star not-checked"
    }

    const delItem = async (itemId) => {
        const deletedItem = await deleteItem(itemId)
        loadItems()
    }

    const updateOne = async (itemId, key, val) => {
        let keyValPair = {}
        keyValPair[key] = val
        const updatedItem = await updateItem(itemId, keyValPair)
        loadItems()
    }

    const updateAll = async () => {
        for (const i of items) {
            const updatedItem = await updateItem(i._id, i)
        }
        await loadItems()
        setRender(!render)
    }

    const changeSortOrder = (col = "title", arrow, arrowChangeFunc = setTitleCol) => {
        if (arrow) arrow === "↓" ? arrowChangeFunc("↑") : arrowChangeFunc("↓")
        const tmpArr = items.slice()
        sortItemsArr(tmpArr, col, arrow)
        setItems(tmpArr)
        updateAll()
    }

    const checkTitle = (i, idx) => {
        const tmpArr = items.slice()
        tmpArr[idx].isChecked = !tmpArr[idx].isChecked
        setItems(tmpArr)
        setTimeout(() => {
            changeSortOrder()
        }, 200)
    }

    const loaded = () => {
        return (
            <div className="List">
                <table>
                    <thead>
                        <tr className="table-title-row">
                            <td></td>
                            <td><button className="sort-button" onClick={(e) => {changeSortOrder('title', titleCol, setTitleCol)}}>Title {titleCol}</button></td>
                            {/* <td><button className="sort-button" onClick={(e) => {changeSortOrder('type', typeCol, setTypeCol)}}>Type {typeCol}</button></td> */}
                            <td><button className="sort-button" onClick={(e) => {changeSortOrder('rank', rankCol, setRankCol)}}>Rank {rankCol}</button></td>
                            <td></td>
                        </tr>
                        
                    </thead>
                    <tfoot>
                        {items.map((item, idx) => {
                        return (
                            <tr key={idx}>
                                <td>
                                    <label className="container">
                                        <input type="checkbox" checked={item.isChecked ? "checked": null}
                                        onChange={(e) => {checkTitle(item, idx)}} />
                                        <span className="checkmark"></span>
                                    </label>
                                </td>
                                <td>
                                    <a href={item.url} target="_blank" text>
                                        {item.isChecked ? <del>{item.title}</del> : item.title}
                                    </a>
                                </td> 
                                {/* <td className="content-type">{item.type === "TV" ? "📺" : "🎬"}</td> */}
                                <td className="rank-buttons">
                                    <button className={starCssClass(item.rank, 1)} onClick={(e) => {updateOne(item._id, "rank", 1)}}>⭑</button>
                                    <button className={starCssClass(item.rank, 2)} onClick={(e) => {updateOne(item._id, "rank",  2)}}>⭑</button>
                                    <button className={starCssClass(item.rank, 3)} onClick={(e) => {updateOne(item._id, "rank",  3)}}>⭑</button>
                                    <button className={starCssClass(item.rank, 4)} onClick={(e) => {updateOne(item._id, "rank",  4)}}>⭑</button>
                                    <button className={starCssClass(item.rank, 5)} onClick={(e) => {updateOne(item._id, "rank",  5)}}>⭑</button>
                                </td>
                                <td className="delete-button"><button onClick={(e) => {delItem(item._id)}}>x</button></td>
                            </tr>
                        )
                    })}
                    </tfoot>
                </table>
                <AddItemList loadItems={loadItems} />
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
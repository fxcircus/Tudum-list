// import data from "../utiliies/sample_data"
import AddItemList from "./AddItemForm"
import { deleteItem } from "../utiliies/api/items-api"

export default function List({ items, setItems, loadItems}) {
    const print_stars = (rank) => {
        let res = ""
        for (let i = 0; i <= rank; i++) {
            res += "⭑"
        }
        return res
    }

    const delItem = async (itemId) => {
        const deletedItem = await deleteItem(itemId)
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
                                <td>{print_stars(item.rank)}</td>
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
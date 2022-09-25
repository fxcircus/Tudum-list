import data from "../utiliies/sample_data"
import AddItemList from "./AddItemForm"

export default function List({ items, setItems }) {
    const print_stars = (rank) => {
        let res = ""
        for (let i = 0; i <= rank; i++) {
            res += "⭑"
        }
        return res
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
                                <td>{item.type === "show" ? "📺" : "🎬"}</td>
                                <td>{print_stars(item.rank)}</td>
                                <td><button>x</button></td>
                            </tr>
                        )
                    })}
                    </tfoot>
                </table>
                <AddItemList />     
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
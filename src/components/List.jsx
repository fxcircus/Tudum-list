import data from "../utiliies/sample_data"

export default function List() {

    const print_stars = (rank) => {
        let res = ""
        for (let i = 0; i <= rank; i++) {
            res += "⭑"
        }
        return res
    }

    return (
        <div className="List">
            <table>
                <tfoot>
                    {data.map((item, idx) => {
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
            <div className="add-new-item-div">
                <button>+</button>  
                <input type="text" placeholder="List item"></input>
            </div>         
        </div>
    )
}
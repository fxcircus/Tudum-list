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
        <table className="List">
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
                        <td><a href={item.url} target="_blank">{item.title}</a></td>
                        <td>{item.type === "show" ? "📺" : "🎬"}</td>
                        <td>{print_stars(item.rank)}</td>
                    </tr>
                )
            })}
            </tfoot>          
        </table>
    )
}
import data from "../utiliies/sample_data"

export default function List() {
    return (
        <table className="List">
            {data.map((item, idx) => {
                return (
                    <tr key={idx}>
                        <td>{item.title}</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                    </tr>
                )
            })}
        </table>
    )
}
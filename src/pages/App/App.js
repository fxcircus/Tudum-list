import List from "../../components/List"
export default function App() {
    return(
        <div className="homepage">
            <img src={"/tudumlist_icon_transperent.png"}/>
            <h2>Netflix Watchlist</h2>
            <List />
        </div>
    )
}
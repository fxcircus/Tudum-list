import List from "../../components/List"
import Foooter from "../../components/Footer"
import { useState, useEffect } from "react"
import { getItems } from "../../utiliies/api/items-api"
import { ContextHolder } from '@frontegg/rest-api'
import { useAuth, useLoginWithRedirect } from "@frontegg/react"

export default function App() {
    const [ items, setItems ] = useState(null)
    const { user, isAuthenticated } = useAuth()
    const loginWithRedirect = useLoginWithRedirect()

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

    // Uncomment this to redirect to login automatically
    // useEffect(() => {
    //   if (!isAuthenticated) {
    // loginWithRedirect();
    //   }
    // }, [isAuthenticated, loginWithRedirect]);

    const logout = () => {
        const baseUrl = ContextHolder.getContext().baseUrl
        window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`
    }

    return(
        <div className="App">
            { isAuthenticated ? (
            <div className="homepage">
                <img src={"/tudumlist_icon_transperent.png"}/>
                <h3>Cross-platform watch list</h3>
                <List items={items} setItems={setItems} loadItems={loadItems} />
                <div>
                    <span>Logged in as: {user?.name}</span>
                    <button onClick={() => logout()}>Click to logout</button>
                </div>  
                <Foooter />
            </div>
        ) : (
            <div className="homepage">
                <div>
                    <button onClick={() => logout()}>Click to logout</button>
                </div>
                <button onClick={() => loginWithRedirect()}>Click me to login</button>
            </div>
        )}
        </div>
    )
}
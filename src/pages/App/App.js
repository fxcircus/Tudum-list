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

    useEffect(() => {
      if (!isAuthenticated) {
    loginWithRedirect()
      }
    }, [isAuthenticated, loginWithRedirect])

    const logout = () => {
        const baseUrl = ContextHolder.getContext().baseUrl
        window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`
    }

    return(
        <div className="App">
            { isAuthenticated ? (
            <div className="homepage">
                <div className="user-area">
                    <p>
                    <img src={user?.profilePictureUrl} alt={user?.name}/>
                    </p>
                    <button onClick={() => logout()}>Logout</button>
                </div>
                <img className="tudumlist-logo" src={"/tudumlist_icon_transperent.png"}/>
                <h3>{user?.name}'s Cross-platform watch list</h3>
                <List items={items} setItems={setItems} loadItems={loadItems} />
                <Foooter />
            </div>
        ) : (
            <div className="homepage">
                <button onClick={() => loginWithRedirect()}>Redirecting to login page...</button>
            </div>
        )}
        </div>
    )
}
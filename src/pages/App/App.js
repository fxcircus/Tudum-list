import List from "../../components/List"
import Foooter from "../../components/Footer"
import SearchModal from "../../components/SearchModal"
import { useState, useEffect } from "react"
import { getItems } from "../../utiliies/api/items-api"
import { ContextHolder } from '@frontegg/rest-api'
import { useAuth, useLoginWithRedirect, AdminPortal } from "@frontegg/react"

export default function App() {
    const [ items, setItems ] = useState(null)
    const { user, isAuthenticated } = useAuth()
    // const [ isAuthenticated, setIsAuthenticated ] = useState(1) // bypass frontEgg
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
                    {/* <img src={user?.profilePictureUrl} alt={user?.name} onClick={() => {AdminPortal.show()}} className="profile-image"/> bypass frontEgg */}
                    </p>
                    <button className ="logout-btn" onClick={() => logout()}>Logout</button>
                </div>
                <img className="tudumlist-logo" src={"/tudumlist_icon_transperent.png"}/>
                {/* <h3>{user?.name}'s Cross-platform watch list</h3> bypass frontEgg */}
                <List items={items} setItems={setItems} loadItems={loadItems} />
                <SearchModal loadItems={loadItems}/>
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
import { useState } from "react"
import { createItem } from "../utiliies/api/items-api"
import { googleTitle } from "../utiliies/api/google-search-api"

export default function AddItemList ({ loadItems }) {
    const [ formData, setFormData ] = useState ({
        title : "",
        isChecked: false,
        rank: 0,
        type: "",
        type: "tv",
        url: ""
    })
    const [ modalOpen, setModalOpen ] = useState (false)
    const [ img, setImg ] = useState ("")
    const [ icon, setIcon ] = useState("🔎")
    const getUrl = async (lastEvt) => {
        setIcon("🌐")
        let res = await googleTitle(lastEvt)
        setImg(res.pagemap.cse_image[0].src)
        const newObj = { url: res.link}
        setFormData(formData => ({...formData, ...newObj}))
        setModalOpen(true)
        setIcon("✔️")
        setTimeout(() => {
            setIcon("🔎") 
        }, 2000);
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const runSearch = () => {
        getUrl(formData.title)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        // await createItem (formData)
        setModalOpen(false)
        setFormData({ title: "" })
        // loadItems()
    }

    return (
        <form className="add-new-item-div" onSubmit={handleSubmit}>
            <button>+</button>  
            <input
                type="text"
                name="title"
                placeholder="List item"
                value={formData.title}
                onChange={handleChange}
            />

            <button type="button" onClick={(e) => {runSearch()}}>{icon}</button>

            {/* <select className="type-select" name="type" id="type" onChange={handleChange}>
                <option value="tv">📺</option>
                <option value="movie">🎬</option>
            </select> */}

            {modalOpen ? (
                <div className="search-modal">
                    <img className="thumbnail" src={img} alt="thumbnail" />
                </div>
            ) :
            ("")}
        </form>  
    )
}
 
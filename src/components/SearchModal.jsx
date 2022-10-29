import { useState } from "react"
import { createItem } from "../utiliies/api/items-api"
import { googleTitle } from "../utiliies/api/google-search-api"

export default function SearchModal ({ loadItems }) {
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
        // setModalOpen(true)
        setIcon("✔️")
        setTimeout(() => {
            setIcon("🔎") 
        }, 2000);
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
        console.log(event.target.value, typeof(event.target.value))
        if(event.target.value.length > 6) {
            console.log("greater than 6 chars, running search")
            getUrl(event.target.value)
        }
    }

    const runSearch = () => {
        getUrl(formData.title)
    }

    const closeModal = () => {
        setModalOpen(false)
        setFormData({ title: "" })
        setImg("")
    }

    const openModal = () => {
        setModalOpen(true)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await createItem (formData)
        setModalOpen(false)
        setFormData({ title: "" })
        loadItems()
    }

    return (
        <div>
            { modalOpen ? (
            
            <div className="modal"
                style={{display: modalOpen ? "block" : "none"}}
                >
            
              <div class="modal-content">
                <button type="button"
                        className="modal-close-button"
                        onClick={(e) => {closeModal()}}>&times;</button>
                <form className="add-new-item-div" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="List item"
                        value={formData.title}
                        onChange={handleChange}
                        autoFocus
                    />

                    <button type="button" onClick={(e) => {runSearch()}}>{icon}</button>

                    {/* <select className="type-select" name="type" id="type" onChange={handleChange}>
                        <option value="tv">📺</option>
                        <option value="movie">🎬</option>
                    </select> */}

                    {img ? (
                        <div className="search-modal">
                            <img className="thumbnail" src={img} alt="thumbnail" />
                        </div>
                    ) :
                    ("")}
                </form>
              </div>
            
            </div>
            ) : (
            <button
                className="modal-open-button"
                onClick={(e) => {openModal()}}
                >Add+</button>
            )} 
        </div> 
    )
}
 
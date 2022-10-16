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
        <div>
            { modalOpen ? (
            
            <div className="modal"
                style={{display: modalOpen ? "block" : "none"}}
                >
            
              <div class="modal-content">
                <button class="close" onClick={(e) => {setModalOpen(false)}}>&times;</button>
                <p>Some text in the Modal..</p>
              </div>
            
            </div>
            ) : (
            <button
                className="modal-open-button"
                onClick={(e) => {setModalOpen(true)}}
                >Add+</button>
            )} 
        </div> 
    )
}
 
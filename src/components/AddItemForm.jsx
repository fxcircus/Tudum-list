import { useState } from "react"
import { createItem } from "../utiliies/api/items-api"

export default function AddItemList ({ loadItems }) {
    const [ formData, setFormData ] = useState ({
        title : "",
        isChecked: false,
        rank: 0,
        type: "",
        type: "tv"
    })

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await createItem (formData)
        setFormData({ title: "" })
        loadItems()
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
                <select name="type" id="type" onChange={handleChange}>
                    <option value="tv">📺</option>
                    <option value="movie">🎬</option>
                </select>
            
        </form>  
    )
}
 
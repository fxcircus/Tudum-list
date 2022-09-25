import { useState } from "react"

export default function AddItemList () {
    const [ formData, setFormData ] = useState ({
        title : "",
        isChecked: false,
        rank: 0,
        type: ""
    })

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    return (
        <form className="add-new-item-div">
            <button>+</button>  
            <input
                type="text"
                name="title"
                placeholder="List item"
                value={formData.title}
                onChange={handleChange}
            />
            <select className="custom-select" name="type" size="2">
                <option value="tv">📺</option>
                <option value="movie">🎬</option>
            </select>
            
        </form>  
    )
}
 
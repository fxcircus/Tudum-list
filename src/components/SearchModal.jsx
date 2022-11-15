import { useState } from "react"
import { createItem } from "../utiliies/api/items-api"
import { googleTitle } from "../utiliies/api/google-search-api"
import { set_platform } from '../utiliies/format_data'

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
    const [ timer, setTimer ] = useState (null)
    const [ returnedTitle, setReturnedTitle ] = useState ("")
    const [ platformList, setPlatformList ] = useState ({
        none:true,
        netflix: false,
        hulu: false,
        apple: false,
        peacock: false,
        amazon: false,
        hbomax: false,
        disneyplus: false
    })
    const [ searchFilter, setSearchFilter ] = useState("")
    const [ correctedTitle, setCorrectedTitle ] = useState(null)
    const [ fadeIn, setFadeIn ] = useState("modal no-fade")

    const getUrl = async (title) => {
        setIcon("🌐")
        const finalSearchTerm = title + searchFilter
        let res = await googleTitle(finalSearchTerm)
        setImg(res.pagemap.cse_image[0].src)
        setFormData(formData => ({...formData, url: res.link}))
        setReturnedTitle(res.title)
        // const regex = /^Watch\s([a-zA-Z0-9\s:']+)\s|/
        // let match = returnedTitle.match(regex)
        // console.log(match)
        // match[1] = match[1].replace('Streaming Online', '')
        // console.log(match[1])
        // setCorrectedTitle(match[1])
        // setModalOpen(true)
        setIcon("✔️")
        setTimeout(() => {
            setIcon("🔎") 
        }, 2000);
    }

    const endTimer = () => {
        console.log("1 second passed, running search!")
        getUrl(formData.title)
    }

    const checkTimeout = () => {
        if (timer) {
            console.log('reseting timer')
            clearTimeout(timer)
            setTimer(setTimeout( endTimer, 1000 ))
        }
        else {
            setTimer(setTimeout( endTimer, 1000 )) // First run (timer is empty str === null)
        }
      }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
        checkTimeout(event.target.value)
    }

    const runSearch = () => {
        getUrl(formData.title)
    }

    const closeModal = () => {
        setFadeIn("modal no-fade")
        setModalOpen(false)
        setFormData({ title: "" })
        setImg("")
    }

    const openModal = () => {
        setFadeIn("modal fade-in")
        setModalOpen(true)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (correctedTitle) {
            setFormData(formData => ({...formData, title: correctedTitle}))
        }
        await createItem (formData)
        closeModal()
        setFormData({ title: "" })
        loadItems()
    }

    const switchSearchFilters = (val) => {
        let newFilter = ""
        setPlatformList({
            none: false,
            netflix: false,
            hulu: false,
            apple: false,
            peacock: false,
            amazon: false,
            hbomax: false,
            disneyplus: false,
            [val] : true
        })
        console.log(platformList)
        
        if (val === "netflix") newFilter += `&siteSearch=www.netflix.com`
        else if (val === "hulu") newFilter += `&siteSearch=www.hulu.com`
        else if (val === "apple") newFilter += `&siteSearch=www.tv.apple.com`
        else if (val === "peacock") newFilter += `&siteSearch=www.peacock.com`
        else if (val === "amazon") newFilter += `&siteSearch=www.amazon.com`
        else if (val === "hbomax") newFilter += `&siteSearch=www.hbomax.com`
        else if (val === "disneyplus") newFilter += `&siteSearch=www.disneyplus.com`
        
        if (val !== "none") newFilter += `&siteSearchFilter=e`
        setSearchFilter(newFilter)
    }

    const checkKeyPress = (e) => {
        if(e.code === "Escape") closeModal()
    }

    return (
        <div onKeyDown={(e) => {checkKeyPress(e)}}>
            { modalOpen ? (
            
            <div className={fadeIn}
                style={{display: modalOpen ? "block" : "none"}}
                >
            
              <div className="modal-content">
                
                <button type="button"
                    className="modal-close-button"
                    onClick={(e) => {closeModal()}}>&times;
                </button>

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
                    
                </form>
                
                <div className="platform-list">
                    <span>Exclude: </span>
                    <label className="platform-label">
                        <input type="radio" checked={platformList.none ? "checked": ""}
                        onChange={(e) => {switchSearchFilters("none")}} />None
                    </label>
                    <label className="platform-label">
                        <input type="radio" checked={platformList.netflix ? "checked": ""}
                        onChange={(e) => {switchSearchFilters("netflix")}} />Netflix
                    </label>
                    <label className="platform-label">
                        <input type="radio" checked={platformList.hulu ? "checked": ""}
                        onChange={(e) => {switchSearchFilters("hulu")}} />Hulu
                        <span className="checkmark"></span>
                    </label>
                    <label className="platform-label">
                        <input type="radio" checked={platformList.apple ? "checked": ""}
                        onChange={(e) => {switchSearchFilters("apple")}} />Apple TV+
                    </label>
                    <label className="platform-label">
                        <input type="radio" checked={platformList.peacock ? "checked": ""}
                        onChange={(e) => {switchSearchFilters("peacock")}} />Peacock
                    </label>
                    <label className="platform-label">
                        <input type="radio" checked={platformList.amazon ? "checked": ""}
                        onChange={(e) => {switchSearchFilters("amazon")}} />Amazon Prime
                    </label>
                    <label className="platform-label">
                        <input type="radio" checked={platformList.hbomax ? "checked": ""}
                        onChange={(e) => {switchSearchFilters("hbomax")}} />HBO Max
                    </label>
                    <label className="platform-label">
                        <input type="radio"checked={platformList.disneyplus ? "checked": ""}
                        onChange={(e) => {switchSearchFilters("disneyplus")}} />Disney
                    </label>
                </div>
                
                {img ? (
                    <div className="returned-results">
                        <p>{returnedTitle}</p>
                        <img className="thumbnail" src={img} alt="thumbnail" />
                    </div>
                ) :
                ("")}

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
 
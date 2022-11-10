import { useState } from "react"
import { createItem } from "../utiliies/api/items-api"
import { googleTitle } from "../utiliies/api/google-search-api"
import { set_platform } from '../utiliies/format_data'

export default function SearchModal ({ loadItems }) {
    const [ render, setRender ] = useState(false)
    const [ formData, setFormData ] = useState ({
        title : "",
        isChecked: false,
        rank: 0,
        type: "",
        type: "tv",
        url: ""
    })
    const [ modalOpen, setModalOpen ] = useState (true)
    const [ img, setImg ] = useState ("")
    const [ icon, setIcon ] = useState("🔎")
    const [ timer, setTimer ] = useState (null)
    const [ returnedTitle, setReturnedTitle ] = useState ("")
    const [ platformList, setPlatformList ] = useState ({
        all: true,
        netflix: true,
        hulu: true,
        apple: true,
        peacock: true,
        amazon: true,
        hbomax: true,
        disneyplus: true
    })
    const [ searchFilter, setSearchFilter ] = useState("&siteSearch=www.netflix.com&siteSearch=www.hulu.com&siteSearch=www.peacock.com&siteSearch=www.amazon.com&siteSearch=www.hbomax.com&siteSearch=www.disneyplus.com&siteSearch=www.tv.apple.com")

    const getUrl = async (title) => {
        setIcon("🌐")
        const finalSearchTerm = title + searchFilter
        let res = await googleTitle(finalSearchTerm)
        setImg(res.pagemap.cse_image[0].src)
        const newUrl = { url: res.link}
        setReturnedTitle(res.title)
        setFormData(formData => ({...formData, ...newUrl}))
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

    const checkTimeout = (inputValue) => {
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
        closeModal()
        setFormData({ title: "" })
        loadItems()
    }

    const switchSearchFilters = async (val) => {
        const newBoolVal = !platformList[val] 
        if (val === 'all' && newBoolVal) {
            const allTrue = {all: true, netflix: true, hulu: true, apple: true, peacock: true, amazon: true, hbomax: true, disneyplus: true}
            setPlatformList({...platformList, ...allTrue})
        } else if (val === 'all' && !newBoolVal){
            const allFalse = {all: false, netflix: false, hulu: false, apple: false, peacock: false, amazon: false, hbomax: false, disneyplus: false}
            setPlatformList({...platformList, ...allFalse})
        } else if (val !== 'all') {
            setPlatformList({...platformList, all: false, [val]: newBoolVal})
        }
        setRender(!render)
        const newFilter = await buildSearchFilter()
        setSearchFilter(newFilter)
        
    }

    const buildSearchFilter = async () => {
        let newFilter
        if (platformList.all) {
            const allSites = "&siteSearch=www.netflix.com&siteSearch=www.hulu.com&siteSearch=www.peacock.com&siteSearch=www.amazon.com&siteSearch=www.hbomax.com&siteSearch=www.disneyplus.com&siteSearch=www.tv.apple.com"
            newFilter = allSites
        } else {
            newFilter = ""
            if (platformList.netflix) newFilter += `&siteSearch=www.netflix.com`
            if (platformList.hulu) newFilter += `&siteSearch=www.hulu.com`
            if (platformList.apple) newFilter += `&siteSearch=www.tv.apple.com`
            if (platformList.peacock) newFilter += `&siteSearch=www.peacock.com`
            if (platformList.amazon) newFilter += `&siteSearch=www.amazon.com`
            if (platformList.hbomax) newFilter += `&siteSearch=www.hbomax.com`
            if (platformList.disneyplus) newFilter += `&siteSearch=www.disneyplus.com`
        }
        return newFilter ? newFilter += '&siteSearchFilter=i' : ""
        // console.log(searchFilter)
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
                    <span>Search on: </span>
                    <label className="platform-label">
                        <input type="checkbox" checked={platformList.all ? "checked": null}
                        onChange={(e) => {switchSearchFilters("all")}} />All
                    </label>
                    <label className="platform-label">
                        <input type="checkbox" checked={platformList.netflix ? "checked": null}
                        onChange={(e) => {switchSearchFilters("netflix")}} />Netflix
                    </label>
                    <label className="platform-label">
                        <input type="checkbox" checked={platformList.hulu ? "checked": null}
                        onChange={(e) => {switchSearchFilters("hulu")}} />Hulu
                        <span className="checkmark"></span>
                    </label>
                    <label className="platform-label">
                        <input type="checkbox" checked={platformList.apple ? "checked": null}
                        onChange={(e) => {switchSearchFilters("apple")}} />Apple TV+
                    </label>
                    <label className="platform-label">
                        <input type="checkbox" checked={platformList.peacock ? "checked": null}
                        onChange={(e) => {switchSearchFilters("peacock")}} />Peacock
                    </label>
                    <label className="platform-label">
                        <input type="checkbox" checked={platformList.amazon ? "checked": null}
                        onChange={(e) => {switchSearchFilters("amazon")}} />Amazon Prime
                    </label>
                    <label className="platform-label">
                        <input type="checkbox" checked={platformList.hbomax ? "checked": null}
                        onChange={(e) => {switchSearchFilters("hbomax")}} />HBO Max
                    </label>
                    <label className="platform-label">
                        <input type="checkbox"checked={platformList.disneyplus ? "checked": null}
                        onChange={(e) => {switchSearchFilters("disneyplus")}} />Disney
                    </label>
                </div>
                
                {img ? (
                    <div className="returned-results">
                        <img className="thumbnail" src={img} alt="thumbnail" />
                        <p>{returnedTitle}</p>
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
 
import { useState } from "react"
import { createItem } from "../utiliies/api/items-api"
import { googleTitle } from "../utiliies/api/google-search-api"
import no_hits_icon from "../utiliies/logos/no_hits.png"

export default function SearchModal ({ loadItems }) {
    const [ modalOpen, setModalOpen ] = useState (false)
    const [ img, setImg ] = useState ("")
    const [ icon, setIcon ] = useState("🔎")
    const [ timer, setTimer ] = useState (null)
    const [ returnedTitle, setReturnedTitle ] = useState ("")
    const [ searchFilter, setSearchFilter ] = useState("")
    const [ fadeIn, setFadeIn ] = useState("modal no-fade")
    const [ formData, setFormData ] = useState ({
        title : "",
        isChecked: false,
        rank: 0,
        type: "",
        type: "tv",
        url: ""
    })
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

    const massageData = (data) => {
        let newStr = data.title.replace(/^Watch\s| - Watch.*Paramount Plus/, '')
        newStr = newStr.replace(/\s\|.*/,'')
        if (newStr) setFormData({ ...formData, title: newStr, url: data.link })
        else setFormData({ ...formData, url: data.link })
    }

    const getUrl = async (title) => {
        setIcon("🌐")
        const finalSearchTerm = title + searchFilter
        let res = await googleTitle(finalSearchTerm)
        console.log(res)
        if (res) { 
            setImg(res.pagemap.cse_image[0].src)
            setReturnedTitle(res.title)
            massageData(res) 
            setIcon("✔️")
            setTimeout(() => {
                setIcon("🔎")
            }, 2000);
        } else {
            setReturnedTitle(`No matches for- ${title}\nTry different keywords`)
            setImg(no_hits_icon)
            setTimeout(() => {
                setIcon("🔎")
            }, 200);
        }
    }

    const endTimer = () => {
        getUrl(formData.title)
    }

    const checkTimeout = () => {
        if (timer) {
            clearTimeout(timer)
            setTimer(setTimeout( endTimer, 1000 ))
        }
        else {
            setTimer(setTimeout( endTimer, 1000 )) // First run (timer is empty str === null)
        }
      }

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        checkTimeout(event.target.value)
    }

    const runSearch = () => {
        getUrl(formData.title)
    }

    const closeModal = () => {
        setFadeIn("modal no-fade")
        setModalOpen(false)
        setFormData({ ...formData, title: "" })
        setImg("")
    }

    const openModal = () => {
        setFadeIn("modal fade-in")
        setModalOpen(true)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        await createItem (formData)
        closeModal()
        setFormData({ ...formData, title: "" })
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
        
        if (val === "netflix") newFilter += `&siteSearch=www.netflix.com`
        else if (val === "hulu") newFilter += `&siteSearch=www.hulu.com`
        else if (val === "apple") newFilter += `&siteSearch=tv.apple.com`
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
                        placeholder="Search shows \ movies "
                        value={formData.title}
                        onChange={handleChange}
                        autoFocus
                    />

                    <button type="button" className="" onClick={(e) => {runSearch()}}>{icon}</button>

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
                    <div className="returned-results" >
                        <p onClick={(e) => {handleSubmit(e)}}>{returnedTitle}</p>
                        <img className="thumbnail" src={img} alt="thumbnail" onClick={(e) => {handleSubmit(e)}}/>
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
 
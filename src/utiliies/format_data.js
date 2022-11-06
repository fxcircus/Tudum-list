export const set_platform = (websiteAdress) => {
     switch(websiteAdress) {
        case "www.netflix.com":
            return "Netflix"
        case "www.disneyplus.com":
            return "Disney+"
        case "www.hbomax.com":
            return "HBO Max"
        case "tv.apple.com":
            return "Apple TV"
        case "www.peackocktv.com":
            return "Peacock TV"
        case "www.paramountplus.com":
            return "Paramount+"
        case "www.hulu.com":
            return "Hulu"  
     }
}
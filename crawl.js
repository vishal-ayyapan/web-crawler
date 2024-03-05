function normalizeURL(urlString){
    const urlPath = new URL(urlString)
    const obj = urlPath.hostname
    const path = urlPath.pathname
    const strippedUrl = `${obj}${path}`
    const caseSensitiveUrl = strippedUrl.toLowerCase()
    if (caseSensitiveUrl.length > 0 && caseSensitiveUrl.slice(-1) === '/'){
        return caseSensitiveUrl.slice(0,-1)
    }
    else{
        return caseSensitiveUrl
    }
    
}

module.exports = {
    normalizeURL
}
const {JSDOM} = require('jsdom')
// pages is an object
async function crawlPage(baseUrl, currentUrl, pages){
    const baseURLObj = new URL(baseUrl)
    const currentURLObj = new URL(currentUrl)
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages
    }
    const normalizedCurrentUrl = normalizeURL(currentUrl)
    if (pages[normalizedCurrentUrl] > 0){
        pages[normalizedCurrentUrl]++
        return pages
    }
    pages[normalizedCurrentUrl] = 1
    console.log(`Fetching data from ${currentUrl}`)
    try {
        const response = await fetch(currentUrl)
        if(response.status > 399){
            console.log(`Failed to fetch, status code : ${response.status}`)
            return pages
        }
        const contentType = response.headers.get('content-type')
        if(!contentType.includes('text/html')){
            console.log(`Failed to fetch, content-type : ${contentType}`)
            return pages
        }
        const htmlBody = await response.text()
        const nextURLs = HTMLbody(htmlBody,baseUrl)
        for (const nextUrl of nextURLs){
            pages = await crawlPage(baseUrl, nextUrl, pages)
        }
        return pages
    } catch (error) {
        console.log(`Failed to fetch: ${error.message} , on page ${currentUrl}`)
    }
}

function HTMLbody(htmlBody, baseUrl){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (let linkElement of linkElements){
        if (linkElement.href.slice(0,1) === '/'){
            try {
                const urlObj = new URL(`${baseUrl}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`Error with relative url ${error.message}`)
            }
        }
        else{
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`Error with relative url ${error.message}`)
            }
        }
    }
    return urls
}


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
    normalizeURL,
    HTMLbody,
    crawlPage
}
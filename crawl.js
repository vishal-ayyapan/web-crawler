const {JSDOM} = require('jsdom')

async function crawlPage(crawlUrl){
    console.log(`Fetching data from ${crawlUrl}`)
    try {
        const response = await fetch(crawlUrl)
        if(response.status > 399){
            console.log(`Failed to fetch, status code : ${response.status}`)
            return
        }
        const contentType = response.headers.get('content-type')
        if(!contentType.includes('text/html')){
            console.log(`Failed to fetch, content-type : ${contentType}`)
            return
        }
        const responseData = await response.text()
        console.log(responseData)
    } catch (error) {
        console.log(`Failed to fetch: ${error.message} , on page ${crawlUrl}`)
    }
}

function HTMLbody(htmlBody, baseUrl){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (let linkElement of linkElements){
        if (linkElement.href.slice(0,1) === '/'){
            try {
                let urlObj = new URL(`${baseUrl}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`Error with relative url ${error.message}`)
            }
        }
        else{
            try {
                let urlObj = new URL(linkElement.href)
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
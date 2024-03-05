function printReport(pages){
    console.log('==========')
    console.log('START REPORT')
    console.log('===========')
    const sortPages = sortPage(pages)
    for (const page of sortPages){
        link = page[0]
        hits = page[1]
        console.log(`Found ${hits} instances of ${link}`)
    }
    console.log('==========')
    console.log('END REPORT')
    console.log('==========')
}


function sortPage(pages){
    const pageArray = Object.entries(pages)
    pageArray.sort((a,b)=>{
        return b[1] - a[1]
    })
    return pageArray
}

module.exports = {
    sortPage,
    printReport
}
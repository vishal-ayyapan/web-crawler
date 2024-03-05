const {crawlPage} = require('./crawl.js')
const {printReport} = require('./sort.js')

async function main(){
    if (process.argv.length < 3){
        console.log('No websites to crawl')
        process.exit(1)
    }
    if(process.argv.length > 3){
        console.log('Multiple websites to crawl')
        process.exit(1)
    }
    const baseUrl = process.argv[2]
    const crawlPages = await crawlPage(baseUrl,baseUrl,{})

    printReport(crawlPages)
}

main()
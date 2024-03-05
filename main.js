const {crawlPage} = require('./crawl.js')

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

    for(const crawlPage of Object.entries(crawlPages)){
        console.log(crawlPage)
    }
}

main()
const {crawlPage} = require('./crawl.js')

function main(){
    if (process.argv.length < 3){
        console.log('No websites to crawl')
        process.exit(1)
    }
    if(process.argv.length > 3){
        console.log('Multiple websites to crawl')
        process.exit(1)
    }
    const crawlUrl = process.argv[2]
    crawlPage(crawlUrl)
}

main()
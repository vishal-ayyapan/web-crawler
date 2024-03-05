const {normalizeURL, HTMLbody} = require("./crawl.js")
const {test, expect} = require("@jest/globals")

test('normalizeURL strip https protocol' , ()=>{
    const input = 'https://www.boot.dev/tracks/backend'
    const actual = normalizeURL(input)
    const expected = 'www.boot.dev/tracks/backend'
    expect(actual).toEqual(expected)
})

test('normalizeURL capital' , ()=>{
    const input = 'https://www.Boot.dev/tracks/backend/'
    const actual = normalizeURL(input)
    const expected = 'www.boot.dev/tracks/backend'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash' , ()=>{
    const input = 'https://www.Boot.dev/tracks/backend/'
    const actual = normalizeURL(input)
    const expected = 'www.boot.dev/tracks/backend'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http protocol' , ()=>{
    const input = 'http://www.Boot.dev/tracks/backend/'
    const actual = normalizeURL(input)
    const expected = 'www.boot.dev/tracks/backend'
    expect(actual).toEqual(expected)
})


// test('HTMLbody absolute urls' , ()=>{
//     const HtmlBody = `
//     <html>
//         <body>
//             <a href='https://www.Boot.dev/tracks/backend/'> Boot Dev </a>
//             <a href='https://www.Boot.dev/tracks/frontend/'> Boot Dev </a>
//         </body>
//     </html>
//     `
//     const inputUrl = 'https://www.boot.dev/tracks/backend/'
//     const actual = HTMLbody(HtmlBody, inputUrl)
//     const expected = ['https://www.boot.dev/tracks/backend/','https://www.boot.dev/tracks/frontend/']
//     expect(actual).toEqual(expected)
// })


test('HTMLbody relative urls' , ()=>{
    const HtmlBody = `
    <html>
        <body>
            <a href='/backend/'> Boot Dev </a>
            <a href='/frontend/'> Boot Devs </a>
            <a href='https://www.boot.dev/backend/'> Boot </a>
        </body>
    </html>
    `
    const baseInputUrl = 'https://www.boot.dev'
    const actual = HTMLbody(HtmlBody, baseInputUrl)
    const expected = ['https://www.boot.dev/backend/','https://www.boot.dev/frontend/', 'https://www.boot.dev/backend/']
    expect(actual).toEqual(expected)
})

test('HTMLbody invalid url' , ()=>{
    const HtmlBody = `
    <html>
        <body>
            <a href='invalid'> Boot Dev Invalid </a>
        </body>
    </html>
    `
    const baseInputUrl = 'https://www.boot.dev'
    const actual = HTMLbody(HtmlBody, baseInputUrl)
    const expected = []
    expect(actual).toEqual(expected)
})






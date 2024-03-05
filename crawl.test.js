const {normalizeURL} = require("./crawl.js")
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




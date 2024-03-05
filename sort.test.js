const {sortPage} = require('./sort')
const {test , expect} = require('@jest/globals')

test("Sorting pages" , ()=>{
    const input = {
        'www.wagslane.dev//tags/writing': 1,
        'www.wagslane.dev//posts/leave-scrum-to-rugby': 6 ,
        'www.wagslane.dev//posts/optimize-for-simplicit-first': 3 ,
        'www.wagslane.dev//posts/kanban-vs-scrum': 5 
}
    const actual = sortPage(input)
    const expected = [
        [ 'www.wagslane.dev//posts/leave-scrum-to-rugby', 6 ],
        [ 'www.wagslane.dev//posts/kanban-vs-scrum', 5 ],
        [ 'www.wagslane.dev//posts/optimize-for-simplicit-first', 3 ],
        ['www.wagslane.dev//tags/writing', 1]
    ]
    expect(actual).toEqual(expected)
})
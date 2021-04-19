
const getOdds = (arr) => arr;


test("it should get odds from an array list", ()=>{
    expect(
        getOdds([1,2,3,4,5])
    ).toEqual([2,4])
})
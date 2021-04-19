const curry = f =>
    x => y => f(x, y);


const modulo = curry((x, y) => y % x);

const isOdd = modulo(2);

const filter = curry((f, arr) => arr.filter(f));

const getOdds = filter(isOdd);


test("it should get odds from an array list", ()=>{
    expect(
        getOdds([1,2,3,4,5])
    ).toEqual([1,3,5])
})


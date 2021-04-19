const curry = f =>
    x => y => f(x, y);


const modulo = curry((m, v) => !!(v % m));

const isOdd = modulo(2);

const filter = curry((f, arr) => arr.filter(f));

const getOdds = filter(isOdd);


test("it should get odds from an array list", ()=>{
    expect(
        getOdds([1,2,3,4,5])
    ).toEqual([1,3,5])
})

const isEven = curry((x, y) => !(y % x))(2)

const getEvens = filter(isEven);

test("it should get even numbers from an array list", ()=>{
    expect(
        getEvens([1,2,3,4,5])
    ).toEqual([2,4])
})


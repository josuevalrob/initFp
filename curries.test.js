const { curry } = require('ramda');

// const curry = f =>
//     x => y => f(x, y);

const modulo = curry((m , bool, v) => (v % m) == bool);
const moduloTwo = modulo(2)
const filter = curry((f, arr) => arr.filter(f));

const isOdd = moduloTwo(true);
const getOdds = filter(isOdd);

test("it should get odds from an array list", ()=>{
    expect(
        getOdds([1,2,3,4,5])
    ).toEqual([1,3,5])
})

const isEven = moduloTwo(false)
const getEvens = filter(isEven);

test("it should get even numbers from an array list", ()=>{
    expect(
        getEvens([1,2,3,4,5])
    ).toEqual([2,4])
})


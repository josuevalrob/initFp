const {compose, toLower, curry, filter, reverse, map, trim, join, split} = require('ramda');

// const compose = (f, g) => x => f(g(x));

const toUpper = str => str.toUpperCase();

const exclaim = str => str + '!';

const first = xs => xs[0];

const shout = compose(exclaim, toUpper);

test("Compose exclaim and toUpper", ()=>{
    expect(shout('tears')).toEqual('TEARS!')
})

const loaderFirst = compose(shout, first)

test("Compose exclaim and toUpper and first", ()=>{
    expect(loaderFirst('TEARS')).toEqual('T!')
})

const concat = curry((y, x) => x + y);

test("Should compuse with two params function", ()=>{
    const quietShout = compose(concat('🔥'), loaderFirst)
    expect(quietShout('TEARS')).toEqual('T!🔥')
})

const doStuff = str =>
    str
    .toLowerCase()
    .split(' ')
    .map( c => c.trim() )
    .reverse()
    .filter(x => x.length > 3)
    .join('')

const doCompose = compose(
    join(''),
    filter(x => x.length > 3),
    reverse,
    map(trim),
    split(' '),
    toLower
)

test("Should doStuffs && doCompose", ()=>{
    expect(
        doStuff('Chain Dot Com')
    ).toEqual('chain')
    expect(
        doCompose('Chain Dot Com')
    ).toEqual('chain')
})

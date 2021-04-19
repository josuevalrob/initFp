const {compose, curry} = require('ramda');

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

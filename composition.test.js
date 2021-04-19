const compose = (f, g) => x => f(g(x));

const add = (x,y) => x + y;

const toUpper = str => str.toUpperCase();

const exclaim = str => str + '!';

const first = xs => xs[0];

const shout = compose(exclaim, toUpper);

test("Compose exclaim and toUpper", ()=>{
    expect(shout('tears')).toEqual('TEARS!')
})

test("Compose exclaim and toUpper and first", ()=>{
    const eins = compose(compose(exclaim, toUpper), first)
    expect(eins('TEARS')).toEqual('T!')
})

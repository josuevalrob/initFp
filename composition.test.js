const _ = require('ramda');

// const compose = (f, g) => x => f(g(x));

const toUpper = str => str.toUpperCase();

const exclaim = str => str + '!';

const first = xs => xs[0];

const shout = _.compose(exclaim, toUpper);

test("Compose exclaim and toUpper", ()=>{
    expect(shout('tears')).toEqual('TEARS!')
})

const loaderFirst = _.compose(shout, first)

test("Compose exclaim and toUpper and first", ()=>{
    expect(loaderFirst('TEARS')).toEqual('T!')
})

const concat = _.curry((y, x) => x + y);

test("Should compuse with two params function", ()=>{
    const quietShout = _.compose(concat('🔥'), loaderFirst)
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

const doCompose = _.compose(
    _.join(''),
    _.filter(x => x.length > 3),
    _.reverse,
    _.map(_.trim),
    _.split(' '),
    _.toLower
)

test("Should doStuffs && doCompose", ()=>{
    expect(
        doStuff('Chain Dot Com')
    ).toEqual('chain')
    expect(
        doCompose('Chain Dot Com')
    ).toEqual('chain')
})

const CARS = [
   {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
   {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
   {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
   {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
   {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
   {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
];
/**
 * Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored names:
 * e.g: sanitizeNames(["Hello world"]) //=> ["hello_world"].
 */

const _underscore = _.replace(/\W/g, '_');

// const sanitizeNames = _.compose(
//     _.map(_.toLower),
//     _.map(_underscore),
//     _.map(_.prop('name')
// ));
const sanitizeNames = _.map(_.compose(_.toLower, _underscore, _.prop('name')));

test("Should sanitizeNames", ()=> {
    expect(
        sanitizeNames(CARS)
    ).toEqual(['ferrari_ff', 'spyker_c12_zagato', 'jaguar_xkr_s', 'audi_r8', 'aston_martin_one_77', 'pagani_huayra'])
});

const append = _.flip(_.concat)
const fastestCar = _.compose(
    append(' is the fastest car'),
    _.prop('name'),
    _.last,
    _.sortBy(_.prop('horsepower'))
)

test("Get the fastes car", ()=> {
    expect(
        fastestCar(CARS)
    ).toEqual("Aston Martin One-77 is the fastest car");
});
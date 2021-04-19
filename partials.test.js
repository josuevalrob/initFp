const {partial} = require('ramda');

const multiply2 = (a, b) => a * b;

const double = partial(multiply2, [2]);

test("it double the value", ()=>{
    expect(
        double(2) //=> 4
    ).toEqual(4)
})


const greet = (salutation, title, firstName, lastName) =>
  salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';

const sayHello = partial(greet, ['Hello']);
const sayHelloToMs = partial(sayHello, ['Ms.']);

test("Say hello ms. Jane Jones", ()=>{
    expect(
        sayHelloToMs('Jane', 'Jones')
    ).toEqual('Hello, Ms. Jane Jones!')
})
//no composition
const nextChartFromNumberString = str => {
    const trimmed = str.trim();
    const number = parseInt(trimmed);
    const nextNumer = number + 1;
    return String.fromCharCode(nextNumer);
}

const result = (str) =>
    [str]
    .map(x => x.trim())
    .map(x => parseInt(x))
    .map(x => x + 1)
    .map(x => String.fromCharCode(x))


//* functor has map method. The ability to put it into the box.
const Box = x => ({
    map: f => Box(f(x)),
    toString: `Box(${x})`,
    fold: f => f(x)
})

const boxChart = str => Box(str)
    .map(x => x.trim())
    .map(trimmed => parseInt(trimmed, 10))
    .map(number => number + 1)
    .fold(String.fromCharCode) //extract from the box

test("Get chart from number spaced string", ()=> {
    expect(nextChartFromNumberString(' 64 ')).toEqual("A");
    expect(boxChart(' 64 ')).toEqual("A");
    expect(result(' 64 ')[0]).toEqual("A"); //now is an array
});

//get the half of the first large number
const first = xs => xs[0];
const halfTheFirstLargeNumber = xs => {
    const found = xs.filter(x => x >= 20);
    const answer = first(found) / 2;
    return `The answer is ${answer}`;
}

const halfTheFirstLargeNumberWithBox = xs => Box(xs)
    .map(fs => fs.filter(x => x >= 20))
    .map(found => first(found) / 2)
    .fold(answer =>`The answer is ${answer}`)

test("Get the half of the first large number", ()=> {
    expect( halfTheFirstLargeNumber([1, 4, 50]) ).toEqual("The answer is 25");
    expect( halfTheFirstLargeNumberWithBox([1, 4, 50]) ).toEqual("The answer is 25");
});

const compose = (f, g) => x => Box(x).map(g).fold(f)

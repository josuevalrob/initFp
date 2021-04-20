//no composition
const nextChartFromNumberString = str => {
    const trimmed = str.trim();
    const number = parseInt(trimmed);
    const nextNumer = number + 1;
    return String.fromCharCode(nextNumer);
}
test("Get chart from number spaced string", ()=> {
    expect(
        nextChartFromNumberString(' 64 ')
    ).toEqual("A");
});

const result = (str) =>
    [str]
    .map(x => x.trim())
    .map(x => parseInt(x))
    .map(x => x + 1)
    .map(x => String.fromCharCode(x))

test("Get chart from number spaced string 2", ()=> {
    expect(
        result(' 64 ')
    ).toEqual(["A"]); //now is an array
});

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

test("Get chart from number spaced string with box", ()=> {
    expect(
        boxChart(' 64 ')
    ).toEqual("A");
});
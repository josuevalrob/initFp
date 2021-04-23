const findColorDummy = name => ({red:'#ff4444', blue:'#3b4998', yellow: '#fff68f'}[name])

test("Should find red color", ()=> {
    expect(findColorDummy('red')).toEqual("#ff4444");
});

test("Should find no defined color", ()=> {
    expect(findColorDummy('redd')).toEqual(undefined);
});

const Right = x => ({
    map: f => Right(f(x)),
    fold: (l, r) => r(x), //will call the provided function
    toString: `Right(${x})`,
});

const Left = x => ({
    map: f => Left(x),
    fold: (l, r) => l(x), //will call other function
    toString: `Left(${x})`,
})

const findColor = name => {
    const found = {red:'#ff4444', blue:'#3b4998', yellow: '#fff68f'}[name]
    return found ? Right(found) : Left('missing')
}

test("Should find red color", ()=> {
    expect(
        findColor('red')
            .map(x=>x.toUpperCase())
            .fold(
                ()=>'no color',
                color => color
            )
    ).toEqual("#FF4444");
});

test("Should find no defined color", ()=> {
    expect(
        findColor('reds')
            .map(x=>x.toUpperCase())
            .fold(
                ()=>'no color',
                color => color
            )
    ).toEqual("no color");
});
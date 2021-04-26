const {fromNullable, Right, Left} = require('../either');

const findColorDummy = name => ({red:'#ff4444', blue:'#3b4998', yellow: '#fff68f'}[name])

test("Should find red color", ()=> {
    expect(findColorDummy('red')).toEqual("#ff4444");
});

test("Should find no defined color", ()=> {
    expect(findColorDummy('redd')).toEqual(undefined);
});

const findColor = name => {
    const found = {red:'#ff4444', blue:'#3b4998', yellow: '#fff68f'}[name]
    return found ? Right(found) : Left('missing')
}

const findColorFromNullable = name => fromNullable({red:'#ff4444', blue:'#3b4998', yellow: '#fff68f'}[name])

const getColor = name => findColorFromNullable(name)
    .map(x=> x.toUpperCase())
    .fold(
        ()=>'no color',
        color => color
    )

test("Should find red color findColorFromNullable", ()=> {
    expect(getColor('red')).toEqual("#FF4444");
});

test("Should find red color findColorFromNullable", ()=> {
    expect(getColor('redas')).toEqual("no color");
});
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
var fs = require('fs');

const findColorDummy = name => ({red:'#ff4444', blue:'#3b4998', yellow: '#fff68f'}[name])

test("Should find red color", ()=> {
    expect(findColorDummy('red')).toEqual("#ff4444");
});

test("Should find no defined color", ()=> {
    expect(findColorDummy('redd')).toEqual(undefined);
});

const Right = x => ({
    map: f => Right(f(x)),
    chain: f => f(x),
    fold: (l, r) => r(x), //will call the provided function
    toString: `Right(${x})`,
});

const Left = x => ({
    map: f => Left(x),
    chain: f => Left(x), //thanks but no... 
    fold: (l, r) => l(x), //will call other function
    toString: `Left(${x})`,
})

const findColor = name => {
    const found = {red:'#ff4444', blue:'#3b4998', yellow: '#fff68f'}[name]
    return found ? Right(found) : Left('missing')
}

const findColorFromNullable = name => fromNullable({red:'#ff4444', blue:'#3b4998', yellow: '#fff68f'}[name])

const fromNullable = x => x!= null ? Right(x) : Left()

const logger = x => {
    console.log('💃',x)
    return x;
}

const getPort_ = () => {
    try {
        const str = fs.readFileSync('config.json');
        const config = JSON.parse(str)
    } catch {
        return 3000;
    }
}

const tryCatch = f => {
    try {
        return Right(f())
    } catch (error) {
        return Left(error)
    }
}

const readFileSync = path => tryCatch(()=> fs.readFileSync(path))

const parseJson = content => tryCatch(()=> JSON.parse(content))

const getPort = (file) =>
    readFileSync(file)
        // .map(content => JSON.parse(content))
        .chain(parseJson)
        .map(config => config.port)
        .fold(
            ()=> 3000,
            x => x
        )

test("get port", ()=>{
    expect(getPort('config.json')).toEqual(8088);
    expect(getPort('notReally.json')).toEqual(3000);
})

module.exports = {
    Right, Left, fromNullable
} 

test("Should find red color findColorFromNullable", ()=> {
    expect(
        findColorFromNullable('red')
            .map(x=> x.toUpperCase())
            .fold(
                ()=>'no color',
                color => color
            )
    ).toEqual("#FF4444");
});

test("Should find red color findColorFromNullable", ()=> {
    expect(
        findColorFromNullable('redas')
            .map(x=> x.toUpperCase())
            .fold(
                ()=>'no color',
                color => color
            )
    ).toEqual("no color");
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
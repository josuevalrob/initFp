const fs = require('fs');
const {tryCatch} = require('../either');

const getPort_ = (route) => {
    try {
        const str = fs.readFileSync(route);
        const config = JSON.parse(str);
        return config.port;
    } catch {
        return 3000;
    }
}

test("get port", ()=>{
    expect(getPort_('config.json')).toEqual(8088);
    expect(getPort_('notReally.json')).toEqual(3000);
})

const readFileSync = path => tryCatch(()=> fs.readFileSync(path))

const parseJson = content => tryCatch(()=> JSON.parse(content))

const getPort = (file) =>
    readFileSync(file)
        .chain(parseJson)
        .map(config => config.port)
        .fold(
            (x)=> 3000,
            x => x
        )

test("get port", ()=>{
    expect(getPort('config.json')).toEqual(8088);
    expect(getPort('notReally.json')).toEqual(3000);
})
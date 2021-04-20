
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
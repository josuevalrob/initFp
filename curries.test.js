const add = (a, b) => a + b;

test("it should plus 1 and 4 and return 5", ()=>{
    expect(
        add(1,4)
    ).toBe(5)
})
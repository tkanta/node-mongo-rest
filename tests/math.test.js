const {calculateTip, celciusToFarenheight, fahrenheightToCelcius, add} = require('../src/math')

test('should calculate total with tip', () => {
    const total = calculateTip(20, .2)
    expect(total).toBe(24)
})

test('should calculate with default tip', () => {
    const total = calculateTip(20)
    expect(total).toBe(22)
})

test('C -> F', () => {
    const temp = celciusToFarenheight(0)
    expect(temp).toBe(32)
})

test('F -> C', () => {
    const temp = fahrenheightToCelcius(32)
    expect(temp).toBe(0)
})

test('should add two numbers', (done) => {
    add(3,4).then((sum) => {
        expect(sum).toBe(7)
        done()
    })
})

test('should add two numbers with async/await', async () => {
    const sum = await add(3,4)
    expect(sum).toBe(7)
})
const calculateTip = (bill, tipPercent = .10) => bill + (bill * tipPercent)

const fahrenheightToCelcius = (temp) => (temp-32) / 1.8

const celciusToFarenheight = (temp) => (temp * 1.8) + 32

const add = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a<0 || b<0) {
                return reject('a or b cannot be negetive')
            }
            resolve(a+b)
        },1000)
        
    })
}

module.exports = {
    calculateTip,
    fahrenheightToCelcius,
    celciusToFarenheight,
    add
}
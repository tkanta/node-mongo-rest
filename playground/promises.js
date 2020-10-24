const promisePattern = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve([23,45,23])
        reject("There is an error")
    }, 1000)
})

promisePattern.then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
})
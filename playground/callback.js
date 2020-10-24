const callbackPattern = (callback) => {

    setTimeout(() => {
        //callback('There is error', undefined)
        callback(undefined, [1,2,3,4])
    }, 2000)
}

callbackPattern((error, result) => {
    if(error){
        return console.log(error)
    }

    console.log(result)
} )
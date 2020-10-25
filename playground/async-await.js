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

const doAdd = async () => {
    const sum1 = await add(1,2)
    const sum2 = await add(sum1, -2)
    return sum2
}

// doAdd().then((res) => {
//     console.log(res)
// }).catch((e) => {
//     console.log(e)
// })

add(1,2).then((sum) => {
    return add(sum, -2)
}).then((sum) => {
    console.log(sum)
}).catch((e) => {
    console.log(e)
})
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(PORT, () => {
    console.log('Server is up on port ', PORT)
})

//---------------- json web token ---------
// const jwt = require('jsonwebtoken')
// const myFunction = () => {
//     const token = jwt.sign({_id:'abc123'}, 'thisismynewcourse')
//     console.log(token)
// }

// myFunction()

//--------------- JSON stringyfy ---------------

// pet = {
//     name: 'leo'
// }

// pet.toJSON = function () {
//     return {name: 'prince'}
// }

// console.log(JSON.stringify(pet))
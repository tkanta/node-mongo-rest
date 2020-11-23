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

// const jwt = require('jsonwebtoken')
// const myFunction = () => {
//     const token = jwt.sign({_id:'abc123'}, 'thisismynewcourse')
//     console.log(token)
// }

// myFunction()
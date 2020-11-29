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

//-------------- User and Task mapping --------
// const Task = require('./models/task')
// const User = require('./models/user')
// const main = async () => {
    //Task -> User
    // const task = await Task.findById('5fc1c6f12eb33a0998d8934e')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    // User -> Task
//     const user = await User.findById('5fc1c676aed15207b8a96acd')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()
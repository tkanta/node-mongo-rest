const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const PORT = process.env.PORT

//---------- multer image upload ----------
// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000 // 1 MB
//     },
//     fileFilter(req, file, cb) {
//         if(!file.originalname.match(/\.(doc|docx)$/))	{
//             cb(new Error('Please upload a word document'))
//         }

//         cb(undefined, true)
//     }
// })
// app.post('/upload', upload.single('upload'), (req,res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })
//----------------------------

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
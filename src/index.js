const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())

app.post('/users', (req,res) => {
    
    const user = new User(req.body)
    try{
        user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
    // console.log(req.body)
    // const user = new User(req.body)

    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
    
})

app.get('/users', async(req, res) => {

    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send(e)
    }
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch( (e) => {
    //     res.status(400).send(e)
    // })
})

app.get('/users/:id', async(req, res) => {
    
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).send("User not found")
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
    // console.log(req.params)
    // User.findById(req.params.id).then((user) => {
    //     if(!user){
    //         res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch( (e) => {
    //     res.status(500).send(e)
    // })
})

app.post('/tasks', async(req,res) => {
    const task = new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
    // console.log(req.body)
    // const task = new Task(req.body)

    // task.save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
    
})

app.listen(PORT, () => {
    console.log('Server is up on port ', PORT)
})
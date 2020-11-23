const express = require('express')
const User = require('../models/user')

const router = express.Router()

//create new user
router.post('/users', async (req,res) => {
    
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
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

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(e){
        res.status(400).send(e.message)
    }
})

router.get('/users', async(req, res) => {

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

router.get('/users/:id', async(req, res) => {
    
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

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isvalidOperation = updates.every((u) => allowedUpdates.includes(u))
    
    if(!isvalidOperation){
        return res.status(400).send({error: 'Invalid update!'})
    }
    try{
         let user = await User.findById(req.params.id)
         console.log(user)
         updates.forEach((u) => user[u] = req.body[u])
         console.log("after: ",user)
         await  user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})

        if(!user){
            return res.status(404).send('User not found')
        }

        res.send(user)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {

    try{

        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(400).send('User not found!')
        }

        res.send(user)
    }catch(e){
        console.log("error")
        res.status(500).send(e)
    }
})



module.exports = router
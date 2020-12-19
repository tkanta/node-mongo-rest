const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account')
const router = express.Router()

//create new user
router.post('/users', async (req,res) => {
    
    const user = new User(req.body)
    try{
        await user.save()
        sendWelcomeEmail(user.email, user.name)
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

router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send('user logged out successfully!')
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()

        res.send('user logged all out successfully!')
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/users/me', auth, (req,res) => {
    res.send(req.user)
})

router.get('/users', async(req, res) => {

    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send(e)
    }
    
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

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isvalidOperation = updates.every((u) => allowedUpdates.includes(u))
    
    if(!isvalidOperation){
        return res.status(400).send({error: 'Invalid update!'})
    }
    try{
         updates.forEach((u) => req.user[u] = req.body[u])
         await  req.user.save()

        res.send(req.user)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

// router.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'age', 'email', 'password']
//     const isvalidOperation = updates.every((u) => allowedUpdates.includes(u))
    
//     if(!isvalidOperation){
//         return res.status(400).send({error: 'Invalid update!'})
//     }
//     try{
//          let user = await User.findById(req.params.id)
//          console.log(user)
//          updates.forEach((u) => user[u] = req.body[u])
//          console.log("after: ",user)
//          await  user.save()
//         //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})

//         if(!user){
//             return res.status(404).send('User not found')
//         }

//         res.send(user)
//     }catch(e){
//         console.log(e)
//         res.status(400).send(e)
//     }
// })

// router.delete('/users/:id', async (req, res) => {

//     try{

//         const user = await User.findByIdAndDelete(req.params.id)

//         if(!user){
//             return res.status(400).send('User not found!')
//         }

//         res.send(user)
//     }catch(e){
//         console.log("error")
//         res.status(500).send(e)
//     }
// })

router.delete('/users/me', auth, async (req, res) => {
    debugger
    try{
        await req.user.remove()
        sendCancellationEmail(req.user.email, req.user.name)
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})


//======= file upload ==========
const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('please upload an image!'))
        }

        cb(undefined, true)
    }
})
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req,res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send('avatar deleted successfully for user !') 
})

router.get('/users/:id/avatar', async(req, res) => {
    try{
        
        // it's not a valid ObjectId, don't proceed
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new Error('not a valid object ID..')
        }
        
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error('avatar not found')
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send(e.message)
    }
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})
module.exports = router
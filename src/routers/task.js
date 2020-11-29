const express = require('express')
const auth = require('../middleware/auth')
const Task = require('../models/task')

const router = express.Router()



router.post('/tasks', auth, async(req,res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
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

router.get('/tasks', auth, async(req,res) => {
    
    try{
        const task = await Task.find({owner: req.user._id})

        if(!task){
            throw new Error('no task found for user')
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
    
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUPdates = ['description', 'completed']
    const isAllowedOperation = updates.every((u) => allowedUPdates.includes(u))

    if(!isAllowedOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try{
        //const task = await Task.findById(req.params.id)
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})

        const task = await Task.findOne({_id:req.params.id, owner: req.user._id})
        
        if(!task){
            return res.status(404).send('Task not found for user!')
        }

        updates.forEach((u) => {
            task[u] = req.body[u]
        })

        await task.save()

        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
    
})


router.delete('/tasks/:id', auth, async (req, res) => {

    try{
                
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})

        if(!task){
            return res.status(404).send('task not found!')
        }

        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router
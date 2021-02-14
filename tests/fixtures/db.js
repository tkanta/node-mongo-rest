const jwt = require('jsonwebtoken')
const mongoose = require ('mongoose')
const User = require('../../src/models/user')

// ----- Test Data ----
const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'kailash@gmail.com',
    age: 75,
    email: 'kailash@gmail.com',
    password: 'kailash7778',
    tokens:[{
        token:jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase
}
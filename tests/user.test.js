//const { TestScheduler } = require('jest')
const  request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require ('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

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

beforeEach( async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Tarini',
        age: 39,
        email: 'tarininegi@gmail.com',
        password: 'rediffmail2'
    }).expect(201)
})

test('should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password,
    }).expect(200)
})

test('should not login for bad credentials', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'testWrong'
    }).expect(400)
})

test('should get a user profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not get profile for unauthenticated user', async () => {
    await request(app)
            .get('/users/me')
            .send()
            .expect(401)
} )

test('should delete user', async () => {
    await request(app)
            .delete('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)
})

test('should not delete user for unauthenticated user', async () => {
    await request(app)
            .delete('/users/me')
            .send()
            .expect(401)
})
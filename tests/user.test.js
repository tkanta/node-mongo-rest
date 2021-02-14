//const { TestScheduler } = require('jest')
const  request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userOneId, userOne, setupDatabase} = require('./fixtures/db')


beforeEach(setupDatabase)

test('should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Tarini',
        age: 39,
        email: 'tarininegi@gmail.com',
        password: 'rediffmail2'
    }).expect(201)

    //check user in db
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user:{
            name: 'Tarini',
            email: 'tarininegi@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('rediffmail2')
})

test('should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password,
    }).expect(200)

    const user = await User.findById(userOneId)
    //console.log("user : "+user)
    expect(response.body.token).toBe(user.tokens[1].token) 
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

    const user = await User.findById(userOneId)
    expect(user).toBeNull()        
})

test('should not delete user for unauthenticated user', async () => {
    await request(app)
            .delete('/users/me')
            .send()
            .expect(401)
})

test('should upload the profile pic', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)    
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update valid user field', async () => {
    await request(app)
          .patch('/users/me')
          .set('Authorization', `Bearer ${userOne.tokens[0].token}`) 
          .send({name: 'Jess'})
          .expect(200)
    const user = await User.findById(userOneId)  
    expect(user.name).toEqual('Jess')
})

test('should not update invalid user field', async () => {
    await request(app)
          .patch('/users/me')
          .set('Authorization', `Bearer ${userOne.tokens[0].token}`) 
          .send({location: 'India'})
          .expect(400)
})
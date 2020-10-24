// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
const {MongoClient, ObjectID} = require('mongodb')

const connectURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"
const id = new ObjectID()
console.log(id.id.length)
console.log(id.toHexString().length)
console.log(id.getTimestamp())

MongoClient.connect( connectURL, { useNewUrlParser : true, useUnifiedTopology: true}, (error, client) => {
    if(error){
        return console.log('unable to connect to database')
    }

    //console.log(' database connection successful !')

    const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     name: 'Tarini',
    //     age: 39
    // }, (error,result) => {
    //     console.log(result.ops)
    // })

    db.collection('users').insertOne({
        _id: id,
        name: 'Tarun',
        age: 42
    }, (error,result) => {
        console.log(result.ops)
    })
})
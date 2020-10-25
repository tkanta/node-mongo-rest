const {MongoClient, ObjectID} = require('mongodb')

const connectURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager-api"

MongoClient.connect( connectURL, { useNewUrlParser : true, useUnifiedTopology: true}, (error, client) => {
    if(error){
        return console.log('unable to connect to database')
    }

    const db = client.db(databaseName)

    // db.collection('users').findOne({name: 'Tarini'}, (error, user) => {
    //     if(error){
    //         console.log('unable to fetch user')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({name: 'Tarini'}).toArray((error, users) => {
    //     if(error){
    //         console.log('unable to fetch user')
    //     }

    //     console.log(users)
    // })

    // db.collection('users').find({name: 'Tarini'}).count((error, counts) => {
    //     if(error){
    //         console.log('unable to fetch user')
    //     }

    //     console.log(counts)
    // })

    db.collection('users').findOne({_id: new ObjectID('5f5de31ca50d4649d02584b4')}, (error, result) => {
        console.log(result)
    })

    db.collection('users').find({age: 42}).toArray((err,res) => {
        console.log(res)
    })
    
})
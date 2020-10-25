const {MongoClient, ObjectID} = require('mongodb')

const connectURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect( connectURL, { useNewUrlParser : true, useUnifiedTopology: true}, (error, client) => {
    if(error){
        return console.log('unable to connect to database')
    }

    const db = client.db(databaseName)

    //------------- update one ------------
    // const updatePromise = db.collection('users').updateOne(
    //     {_id: new ObjectID('5f5de31ca50d4649d02584b4')}, 
    //     {
    //         $set: {
    //             name: 'Kailash_1'
    //         },
    //         $min:{
    //             age: 29
    //         }
    //     }
    // )
    
    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    //---------------- update Many ---------
    // db.collection('users').updateMany({age: 42}, {$set: { age: 39} }).then((res) => {
    //     console.log(res.modifiedCount)
    // }).catch((err) => {
    //     console.log(err)
    // })

    db.collection('users').deleteMany({age: 27}).then((res) => {
        console.log(res.deletedCount)
    }).catch((err) => {
        console.log(err)
    })
})